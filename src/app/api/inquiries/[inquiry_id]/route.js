import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
// import { calculateSince } from "@/lib/calculateSince" // wherever yours is
function calculateSince(dateString) {
    const today = new Date(Date.now()).getTime()
    const providedDate = new Date(dateString).getTime()
    return (today - providedDate) / (1000 * 60 * 60 * 24)
}

export async function GET(
  request,
  { params }
) {
    const { inquiry_id } = params
    console.log(inquiry_id)

  const adminSessionKey = request.cookies.get("admin_session")?.value
  if (!adminSessionKey) {
    return NextResponse.json({ success: false, message: "missing authorization" }, { status: 401 })
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

  // validate session
  const { data: admin, error: adminErr } = await supabase
    .from("admin_accounts")
    .select("*")
    .eq("session_id", adminSessionKey)
    .single()

  if (adminErr || !admin) {
    return NextResponse.json({ success: false, message: "invalid authorization" }, { status: 401 })
  }

  // expire session
  const daysSince = calculateSince(admin.creation)
  if (daysSince > 7) {
    await supabase
      .from("admin_accounts")
      .update({ session_id: null })
      .eq("session_id", adminSessionKey)

    return NextResponse.json(
      { success: false, message: "authentication expired, please login again" },
      { status: 401 }
    )
  }

  // lookup inquiry
  const { data: inquiry, error: inquiryErr } = await supabase
    .from("inquiries")
    .select("*")
    .eq("lookup_id", inquiry_id)
    .single()

  if (inquiryErr || !inquiry) {
    return NextResponse.json({ success: false, message: "no records found" }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: inquiry })
}
