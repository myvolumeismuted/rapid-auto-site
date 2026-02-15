import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

function calculateSince(dateString: string) {
    if(!dateString) return 100
    const today = new Date(Date.now()).getTime()
    const providedDate = new Date(dateString).getTime()
    return (today - providedDate) / (1000 * 60 * 60 * 24)
}

export async function GET(request: NextRequest) {
    // GRAB THE AUTH KEY AND INITIATE CONNECTION TO API
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
        return NextResponse.json({success: false, message: "authentication expired, please login again"})
    }

    // SEND RESPONSE AS LONG AS DATA EXISTS
    if (!data.id) return NextResponse.json({success: false, message: "no records found"})
    return NextResponse.json({ success: true, message: "verified", verified: true })
}