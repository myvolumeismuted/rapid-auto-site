import { NextResponse, NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { createClient } from "@supabase/supabase-js"


export async function POST(request: NextRequest) {
    // COOKIE VERIFICATION FOR ACCESS
    // const requestCookies = request.cookies.getAll()
    // const adminSessionToken = request.cookies.get("admin_session")?.value; if (!adminSessionToken) return NextResponse.json({success: false, message: "Not authorized."})

    // MAKE SURE THE REQUESTED INQUIRY ACTUALLY WAS INCLUDED
    const body = await request.json().catch(() => null);
    if (!body?.id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });
    const id = body.id;

    // PROCEED TO DATABASE COMMUNICATION
    const baseApiRoute = process.env.SUPABASE_URL!
    const supabase = createClient(baseApiRoute, process.env.SUPABASE_KEY!)
    const { data, error } = await supabase.from("inquiries").select("*").eq("lookup_id", id)
    if (error) return NextResponse.json({success: false, message: "error gathering"})
    console.log(data)
    return NextResponse.json({ data: data })


}