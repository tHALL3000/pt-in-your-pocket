import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "edge";

// POST /api/push — store a push subscription
export async function POST(req: Request) {
  const { endpoint, keys } = await req.json();
  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("PtPushSubscription")
    .upsert(
      { endpoint, p256dh: keys.p256dh, auth: keys.auth },
      { onConflict: "endpoint" }
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE /api/push — remove a push subscription
export async function DELETE(req: Request) {
  const { endpoint } = await req.json();
  if (!endpoint) return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });

  const admin = createAdminClient();
  await admin.from("PtPushSubscription").delete().eq("endpoint", endpoint);
  return NextResponse.json({ ok: true });
}
