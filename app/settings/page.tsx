"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import CornerDecoration from "@/components/CornerDecoration";
import { type RoutineLevel, ROUTINE_META, readRoutineLevel, writeRoutineLevel } from "@/lib/routine";

export default function SettingsPage() {
  const [routineLevel, setRoutineLevel] = useState<RoutineLevel>("starter");

  useEffect(() => { setRoutineLevel(readRoutineLevel()); }, []);

  function handleRoutineChange(level: RoutineLevel) {
    setRoutineLevel(level);
    writeRoutineLevel(level);
  }

  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushSupported] = useState(() =>
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
  const [toggling, setToggling] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
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
      <main className="flex flex-col gap-6 px-4 pt-6 pb-32" style={{ minHeight: "100dvh", position: "relative" }}>
        <h1 style={{ margin: 0 }}>Settings</h1>

        {/* Your Routine */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-4"
          style={{ background: "#f5eddf", border: "2px solid #e0d0bc" }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Your Routine</h2>
            <p style={{ margin: "6px 0 0", fontSize: "0.95rem", color: "#8b6355", lineHeight: 1.5 }}>
              Choose how many exercises to show on your Today page. You can always change this as you get stronger.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {(["starter", "building", "full"] as RoutineLevel[]).map((tier) => {
              const meta = ROUTINE_META[tier];
              const isActive = routineLevel === tier;
              return (
                <button
                  key={tier}
                  onClick={() => handleRoutineChange(tier)}
                  style={{
                    background: isActive ? "#eaf2ea" : "#fdf8f0",
                    border: `2px solid ${isActive ? "#3d6b4a" : "#e0d0bc"}`,
                    borderRadius: "14px",
                    padding: "1rem 1.1rem",
                    minHeight: "70px",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#3d3123" }}>
                      {meta.label}
                    </p>
                    <p style={{ margin: "3px 0 0", fontSize: "0.85rem", color: "#8b6355", lineHeight: 1.4 }}>
                      {meta.count} exercises · {meta.desc.split(" · ")[1] ?? meta.desc}
                    </p>
                  </div>
                  {isActive && (
                    <span style={{ fontSize: "1.4rem", color: "#3d6b4a", flexShrink: 0 }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

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
          className="rounded-2xl p-5 flex flex-col gap-3"
          style={{ background: "#f5eddf", border: "2px solid #e0d0bc" }}
        >
          <h2 style={{ margin: 0, fontSize: "1.1rem" }}>About</h2>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#8b6355", lineHeight: 1.6 }}>
            PT Companion is an open-source personal exercise tracker for home use during knee recovery.
            All data stays private and is only stored on this device.
          </p>
          <div
            className="rounded-xl p-3 flex flex-col gap-2"
            style={{ background: "#fff4f4", border: "1px solid #d4a5a5" }}
          >
            <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "#7a2f2f", lineHeight: 1.5 }}>
              ⚠️ Medical Disclaimer
            </p>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#7a2f2f", lineHeight: 1.6 }}>
              This app is not medical advice. The creator is not a doctor, physical therapist, or licensed
              healthcare provider. All exercises should be performed only under the guidance and approval
              of your own physical therapist or physician.
            </p>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#7a2f2f", lineHeight: 1.6 }}>
              By using this app or any part of its open-source code, you acknowledge that you use it
              entirely at your own risk. The creator assumes no liability for any injury, harm, or
              adverse outcome that may result from use of this app.
            </p>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#7a2f2f", lineHeight: 1.6 }}>
              Stop immediately and consult your healthcare provider if you experience pain, swelling,
              or discomfort during any exercise.
            </p>
          </div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#8b6355" }}>
            Made with 🌿 and care.
          </p>
        </div>
        <CornerDecoration src="/decorations/bottom-right-corner-root.png" corner="bottom-right" />
      </main>

      <BottomNav />
    </>
  );
}

