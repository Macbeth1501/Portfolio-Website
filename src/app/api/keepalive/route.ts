import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Pinged daily by the Vercel cron job (see vercel.json) so the Supabase
 * free-tier project never sits idle long enough to auto-pause.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase env vars are not configured" },
      { status: 500 },
    );
  }

  const { error } = await supabase.from("site_settings").select("id").limit(1);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, pinged_at: new Date().toISOString() });
}
