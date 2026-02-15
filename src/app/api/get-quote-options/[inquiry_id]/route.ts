import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ inquiry_id: string }> }
) {
  const { inquiry_id } = await context.params; // ✅ unwrap ONCE

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
        .eq("lookup_id", inquiry_id).single(); // ✅ use the unwrapped value

  if (error) {
    return NextResponse.json(
      { success: false, error: true, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data: data });
}
