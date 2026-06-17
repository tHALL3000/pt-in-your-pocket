"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";

export default function SettingsPage() {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setPushSupported("serviceWorker" in navigator && "PushManager" in window);

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // Check if already subscribed
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          setPushEnabled(!!sub);
        });
      });
    }
  }, []);

  async function togglePush() {
    setToggling(true);
    setStatus("");

    try {
      const reg = await navigator.serviceWorker.ready;
      const existing = await reg.pushManager.getSubscription();

      if (existing) {
        await existing.unsubscribe();
        await fetch("/api/push", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: existing.endpoint }),
        });
        setPushEnabled(false);
        setStatus("Reminders turned off.");
      } else {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          setStatus("Notification permission denied. Please enable it in your iPhone Settings → Notifications.");
          setToggling(false);
          return;
        }

        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        });

        const json = sub.toJSON();
        await fetch("/api/push", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            endpoint: json.endpoint,
            keys: json.keys,
          }),
        });

        setPushEnabled(true);
        setStatus("Reminders turned on! You'll get a daily nudge 🌿");
      }
    } catch (err) {
      setStatus("Something went wrong. Make sure this app is added to your Home Screen first.");
      console.error(err);
    } finally {
      setToggling(false);
    }
  }

  return (
    <>
      <main className="flex flex-col gap-6 px-4 pt-6 pb-32" style={{ minHeight: "100dvh" }}>
        <h1 style={{ margin: 0 }}>Settings</h1>

        {/* Push notifications */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-4"
          style={{ background: "#f5eddf", border: "2px solid #e0d0bc" }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Daily Reminders</h2>
            <p style={{ margin: "6px 0 0", fontSize: "0.95rem", color: "#8b6355", lineHeight: 1.5 }}>
              Get a gentle push notification each day reminding you to do your exercises.
              For this to work, first add this app to your iPhone Home Screen (tap Share → Add to Home Screen).
            </p>
          </div>

          {!pushSupported && (
            <div
              className="rounded-xl p-3"
              style={{ background: "#fff8ec", border: "1px solid #e8d0a0" }}
            >
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#7a5c1e" }}>
                ⚠️ To enable reminders, add this app to your Home Screen and open it from there.
              </p>
            </div>
          )}

          {pushSupported && (
            <button
              onClick={togglePush}
              disabled={toggling}
              style={{
                background: pushEnabled ? "#d4a5a5" : "#3d6b4a",
                color: "#fdf8f0",
                border: "none",
                borderRadius: "14px",
                padding: "1rem",
                fontSize: "1.1rem",
                fontWeight: 700,
                minHeight: "60px",
              }}
            >
              {toggling
                ? "Working…"
                : pushEnabled
                ? "Turn Off Reminders"
                : "Turn On Daily Reminders 🌿"}
            </button>
          )}

          {status && (
            <p style={{ margin: 0, fontSize: "0.95rem", color: "#3d6b4a", lineHeight: 1.5 }}>
              {status}
            </p>
          )}
        </div>

        {/* About */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-2"
          style={{ background: "#f5eddf", border: "2px solid #e0d0bc" }}
        >
          <h2 style={{ margin: 0, fontSize: "1.1rem" }}>About</h2>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#8b6355", lineHeight: 1.6 }}>
            PT Companion is a personal home exercise app for knee recovery. All your data stays
            private and is only accessible on this device.
          </p>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#8b6355" }}>
            Made with 🌿 and care.
          </p>
        </div>
      </main>

      <BottomNav />
    </>
  );
}

