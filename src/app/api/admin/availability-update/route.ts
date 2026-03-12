import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
    // EXTRACT DATE TIMES FROM REQUEST BODY
    const { dateTimes } = await request.json()
    // CONNECT TO SUPABASE
    try {
        const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
        // APPEND TO SUPABSE DATABASE
        const serializedDates = JSON.stringify(dateTimes)
        const { data, error } = await supabase.from("mechanic_availability").insert({ times: serializedDates }).select().single()
        if (error) return NextResponse.json({ success: false })
        return NextResponse.json({success: true, message: "Successfully updated availability times", d: data})
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}