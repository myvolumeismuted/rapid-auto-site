import { NextResponse, NextRequest } from "next/server";
import { PingOptions } from "../../../../Functions/Ping";
import { createClient } from "@supabase/supabase-js";

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
        return NextResponse.json({success: true})
    } catch (error) {
        return NextResponse.json({success: false, message: "Internal Server Error 505"})
    }
}