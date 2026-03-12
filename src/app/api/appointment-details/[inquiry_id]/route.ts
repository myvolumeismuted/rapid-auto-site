import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


export async function GET(request: NextRequest, { params }: { params: { inquiry_id: string } }) {
    const { inquiry_id } = await params
    if (!inquiry_id) return NextResponse.json({ success: false, message: "please provide a valid inquiry id" })
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    const { data, error } = await supabase.from("inquiries").select("*").eq("lookup_id", inquiry_id).single()
    if (error || !data) return NextResponse.json({ success: false, message: "No data containing the search parameters" })
    const filteredData = { ...data }
    delete filteredData.quote_options
    return NextResponse.json({success: true, data: filteredData})
}