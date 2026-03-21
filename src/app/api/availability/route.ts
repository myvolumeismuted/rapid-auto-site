import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


export async function GET(request: NextRequest) {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    const { data, error } = await supabase.from("mechanic_availability").select("*")
    if (error || !data || data.length < 1) return NextResponse.json({ success: false })
    console.log(data, typeof data)
    return NextResponse.json({times: data![data.length - 1].times})
}

