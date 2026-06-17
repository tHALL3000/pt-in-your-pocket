"use client";

import { useEffect, useState } from "react";
import { getDailyMessage } from "@/content/motivation";

const message = getDailyMessage();

export default function MotivationBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastDismissed = localStorage.getItem("pt-motivation-dismissed");
    if (lastDismissed !== today) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDismissed(false);
    }
  }, []);

  function dismiss() {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("pt-motivation-dismissed", today);
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8"
      style={{ background: "rgba(253,248,240,0.97)" }}
    >
      <div className="mb-8 text-6xl select-none" aria-hidden>🌿</div>

      <p
        className="text-center mb-10 leading-relaxed max-w-xs"
        style={{
          fontFamily: "var(--font-lora, Georgia, serif)",
          fontSize: "1.55rem",
          color: "#3d6b4a",
          fontWeight: 600,
          lineHeight: 1.45,
        }}
      >
        {message}
      </p>

      <button
        onClick={dismiss}
        className="w-full max-w-xs rounded-2xl font-semibold tracking-wide"
        style={{
          background: "#3d6b4a",
          color: "#fdf8f0",
          fontSize: "1.25rem",
          padding: "1rem 1.5rem",
          minHeight: "60px",
          border: "none",
        }}
      >
        I&apos;m ready 🌱
      </button>
    </div>
  );
}
