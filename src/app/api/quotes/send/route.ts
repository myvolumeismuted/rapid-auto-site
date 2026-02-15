import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer"


function calculateSince(dateString: string) {
    if (!dateString) return 100
    const today = new Date(Date.now()).getTime()
    const providedDate = new Date(dateString).getTime()
    return (today - providedDate) / (1000 * 60 * 60 * 24)
}


async function sendQuoteEmail(target: string, name: string, quoteOptions: []): Promise<{ success: boolean }> {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "kam@rapidautoworks.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    return {success: false}
}

async function main(targetEmail: string, lookup_id: string) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "kam@rapidautoworks.com",
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });

    await transporter.sendMail({
        to: targetEmail,
        subject: "Your recent service request",
        from: '"Kam @ RapidAuto"',
        html: `
            <p style= "font-size: 15px" >There are new quote options for your service request. Use the link below or click <a href="https://www.rapidautoworks.com/quote-approval/${lookup_id}">here</a> to continue with your request. </p>
            <a style="width: 100%; height: 10px"; background-color: red; color: white; padding: 5%>View Quote Options</a>
        `
    }).catch(error => {
        console.log(error)
    }).then(() => {
        console.log("email sent")
    })
}

export async function POST(request: NextRequest) {
    const reqdata = await request.json().catch(error => { return null })
    console.log(reqdata)
    const { quote, lookup_id } = reqdata
    if (!reqdata || !quote || !lookup_id) return NextResponse.json({ success: false, message: "No data provided" })

    // VERIFY THIS REQUEST IS ALLOWED
    const adminSessionKey = request.cookies.get("admin_session")?.value
    console.log(adminSessionKey)
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    const { data, error } = await supabase.from("admin_accounts").select("*").eq("session_id", adminSessionKey).single()
    if (error) console.log(error)
    if (data) {
        console.log(data, "this is the data")
    }
    if (error) return NextResponse.json({ success: false, message: "invalid authorization" })

    // IF THE COOKIE IS EXPIRED, DELETE THE SESSION
    const daysSince = calculateSince(data.creation || null)
    if (daysSince > 7) {
        // REMOVE THE CURRENT SESSION FROM THE TABLE
        await supabase.from("admin_accounts").update({ session_id: null }).eq("session_id", adminSessionKey).select()
        return NextResponse.json({ success: false, message: "authentication expired, please login again" })
    }
    if (!data.id) return NextResponse.json({ success: false, message: "no records found" })
    
    // PROCEED TO SENDING QUOTE. SEND IT THROUGH GMAIL. ALL QUOTES INCLUDED IN HTML, SEND EMAIL TO OWNER TO KNOW QUOTE SENT
    const { data: submissionData, error: submissionError } = await supabase.from("inquiries").update({ quote_options: JSON.stringify(quote) }).eq("lookup_id", lookup_id).select("*").single()
    console.log(submissionData)
    if (submissionError) return NextResponse.json({ success: false, error: submissionError.message })
    if (submissionData) {
        await main(submissionData.email, submissionData.lookup_id)
        return NextResponse.json({ success: true, data: submissionData })
    }
    
}

































/**
 * Car: 350.00
 * Phone: 200.00
 * Insurance: 197.20
 * Credit Cards: 100.00
 * Save: 200.00
 * Gas: 200.00
 * Electric: 216.00
 * 
 * 1463.20 Total Out Per Month Non Negotiable - 500 Left
*/



/**
 * 3600 Monthly Income
 * 650 Car
 * 1570 Rent
 * 270 Insurance
 * 428 Phones 
 * 150 toilet
 * 120 Gas
 * 120 Cigs
 * 30 Laundry
 * 200 Outside Food
 * 
 * total: 3418 - 200 Left
*/


/**
 * BUDGET:
 *  
 */