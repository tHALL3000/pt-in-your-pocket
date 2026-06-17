import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendPushNotification } from "@/lib/push";
import { getRandomReminderMessage } from "@/content/motivation";

export async function POST(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const admin = createAdminClient();
  const { data: subscriptions } = await admin
    .from("PtPushSubscription")
    .select("endpoint, p256dh, auth");

  if (!subscriptions || subscriptions.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  const message = getRandomReminderMessage();
  let sent = 0;

  for (const sub of subscriptions) {
    try {
      await sendPushNotification(sub, {
        title: "PT Companion 🌿",
        body: message,
        url: "/",
      });
      sent++;
    } catch {
      // Subscription may be expired — remove it
      await admin.from("PtPushSubscription").delete().eq("endpoint", sub.endpoint);
    }
  }

  return NextResponse.json({ sent });
}
