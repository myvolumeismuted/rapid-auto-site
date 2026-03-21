import { NextResponse, NextRequest } from "next/server";
import { PingOptions } from "../../../../Functions/Ping";
import { createClient } from "@supabase/supabase-js";


export async function POST(request: NextRequest) {
    console.log("new ping made")
    const data: PingOptions = await request.json()
    const {session_id} = data
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    // FIRST CHECK FOR EXISTING SESSION. IF EXISTS - DATA IS ADDON ELSE CREATE NEW SESSION
    const { data: searchResults, error } = await supabase.from("visits").select("*").eq("session_id", session_id).maybeSingle()
    if (error) return NextResponse.json({ err: error })
    if (searchResults) {
        // SESSION EXISTS - UPDATE SESSION DATA
        const {session_id, ...filteredData} = data
        const { data: updateData, error: updateError } = await supabase.from("visits").update(data).eq("session_id", session_id)
        if (updateError) return NextResponse.json({ success: false })
        return NextResponse.json({success: true})
    } else {
        // CREATE NEW SESSSION WITH PREFIXED DATA
        // GET THE USERS IP AND LOCATION
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "unknown"
        console.log(ip)
        const response = await fetch(`https://ipapi.co/${ip}/json/`)
        const {city, region, region_code, latitude, longitude, postal, error} = await response.json()
        const locationMetrics = !error ? { ip, city, region, region_code, latitude, longitude, postal } : {}
        console.log(locationMetrics, error)
        // DETERMINE IF THE USER HAS VISITED THE SITE PRIOR USING THEIR UNIQUE IDENTIFIER
        const { data: pastVisits, error: pastVisitsError } = await supabase.from("visits").select("*").eq("user_identifier", data.user_identifier)
        if (pastVisitsError) return NextResponse.json({ success: false })
        const returning = pastVisits?.length > 0 ? true : false
        // BUILD THE NEW OBJECT 
        const inputDoc = { ...data, returning, location: locationMetrics }
        // INPUT THE BUILT DATA INTO THE DATABSE
        const { data: uploadData, error: uploadError } = await supabase.from("visits").insert([inputDoc])
        if (uploadError) return NextResponse.json({ success: false })
        return NextResponse.json({success: true})
    }
}