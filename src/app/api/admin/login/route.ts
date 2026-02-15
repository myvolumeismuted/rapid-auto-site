import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs"


async function verify(password: string, hashedPass: string) {
    return await bcrypt.compare(password, hashedPass)
}

function createSession() {
    let session = "XXXX-XXXX-XXXX-XXXX-XXXX"
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    while (session.includes("X")) {
        session = session.replace("X", characters.charAt(Math.floor(Math.random() * characters.length)))
    }
    return session
}

function createTimeStamp() {
    return new Date(Date.now()).getTime()
}

export async function POST(request: NextRequest) {
    // VERIFY USERNAME AND PASSWORD INPUT
    let body: any;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ success: false, message: "Invalid JSON" }, { status: 400 });
    }

    const { username, password } = body ?? {};
    if (!username || !password) return NextResponse.json({ success: false, message: "Failed to parse the request" }, { status: 400 })

    // LOG INTO SUPABASE
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

    // SELECT THE DOCUMENT THAT HAS THE PROVIDED USERNAME
    const { data, error } = await supabase.from("admin_accounts").select("*").eq("username", username).single()
    if (error) return NextResponse.json({ success: false, message: "Failure to connect to database" }, { status: 400 })
    const { username: storedUser, password: storedPassHash } = data
    const result = await verify(password, storedPassHash)
    console.log(result, password, storedPassHash)
    if (!result) return NextResponse.json({success: false, message: "Invalid credentials"})

    // IF PASSWORD TEST HAS PASSED CREATE NEW SESSION AND WRITE IT TO THE TABLE
    const newSessionID = createSession()
    const { data: d, error: e } = await supabase.from("admin_accounts").update({ session_id: newSessionID }).eq("username", username).single()
    if (e) return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    
    const { data: d2, error: e2 } = await supabase.from("admin_accounts").update({ creation: createTimeStamp() }).eq("username", username).single()
    if (e2) return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    
    // SET THAT SESSION ID AS A COOKIE ON THE RESPONSE
    const response = NextResponse.json({ success: true, message: "successfully logged in. welcome back." })
    response.cookies.set("admin_session", newSessionID, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    })

    return response

}