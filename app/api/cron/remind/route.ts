import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "edge";

// This endpoint returns subscriptions to the GitHub Actions cron job,
// which handles the actual web push sending in Node.js (not edge).
export async function POST(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const admin = createAdminClient();
  const { data: subscriptions } = await admin
    .from("PtPushSubscription")
    .select("endpoint, p256dh, auth");

  return NextResponse.json({ subscriptions: subscriptions ?? [] });
}
