import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


export async function GET(request: NextRequest) {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    const { data, error } = await supabase.from("mechanic_availability").select("*")
    const times = JSON.parse(JSON.stringify(data))
    return NextResponse.json({times: times[times.length - 1].times})
}

/**
 * 659.60
 * 217.77 phone
 * 197.20 insurance
 * 244.06 left
 * 
 */