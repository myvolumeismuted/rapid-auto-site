import { NextResponse, NextRequest } from "next/server";
import { PingOptions } from "../../../../Functions/Ping";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer"
import { metadata } from "@/app/layout";

function getClientIp(req: NextRequest) {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return ""
}

async function gatherIPData(ip_address: string) {
    const response = await fetch(`https://ipapi.co/${ip_address}/json/`)
    const data = await response.json().catch(error => { return {} })
    if (Object.keys(data).length > 0) {
        return data
    } else {
        return {}
    }
}

async function sendNTFY() {
    try {
        // 1. Send the text notification to your unique ntfy topic
        await fetch('https://ntfy.sh/rapid-auto-visits', {
          method: 'POST',
          body: '🚀 Someone just visited your website!',
          headers: {
            'Title': 'New Website Visit',
            'Priority': 'high', // Makes it bypass Android battery saving
            'Tags': 'chart_with_upwards_trend' // Adds fun emojis to the notification banner
          }
        });
        return true
      } catch (error) {
        console.error('Notification failed:', error);
        return false
      }
}

async function sendNewVisitMail(timestamp?: number) {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    const formatedDate = formatter.format(new Date(timestamp || 0))
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "kam@rapidautoworks.com",
            pass: process.env.GOOGLE_APP_PASSWORD
        }
    })
    if (timestamp) {
        const date = new Date(timestamp)
        const hrs = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`
        await transporter.sendMail({
            subject: "New Website Visit",
            text: timestamp ? `A new website visit was made on ${formatedDate}` : "There's been a new website visit",
            priority: "high",
            to: "kamerenrichardson1@gmail.com",
            from: "kam@rapidautoworks.com"
        })
    }
    
}
  
export async function POST(request: NextRequest) {
    try {
        const data: PingOptions = await request.json()
        const ip = getClientIp(request)
        const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
        if (!data.session_id) return NextResponse.json({ success: false, message: "Verify you are using a valid session ID" })
        const ipdata = await gatherIPData(ip)
        // JUST INSERT THE DOCUMENT
        const payload = {
            session_id: data.session_id,
            event_name: data.event_name,
            user_identifier: data.user_identifier,
            metadata: (ip && ip !== "") ? {...data.metadata, network: {ip_address: ip, ...ipdata}} : data.metadata
        }
        const { data: InsertData, error: InsertError } = await supabase.from("tracking_data").insert([payload]).select().single()
        if (InsertError) return NextResponse.json({ success: false, message: "Error updating the database", err: InsertError })
        try {
            await sendNewVisitMail(payload?.metadata?.visit_timestamp || null)
        } catch (error) {
            console.log("error sending notification")
            console.log(error)
        }
        const success = await sendNTFY()
        if (!success) console.log("Error sending NTFY")
        return NextResponse.json({success: true})
    } catch (error) {
        return NextResponse.json({success: false, message: "Internal Server Error 505"})
    }
}