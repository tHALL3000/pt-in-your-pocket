"use client";

import { DEMO_MODE } from "@/lib/demo-store";

export default function DemoBanner() {
  if (!DEMO_MODE) return null;

  return (
    <div
      className="no-print"
      style={{
        background: "#3d6b4a",
        color: "#fdf8f0",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        fontSize: "0.9rem",
        lineHeight: 1.4,
      }}
    >
      <p style={{ margin: 0 }}>
        🌿 <strong>Demo mode</strong> — your progress is saved in this browser only.
      </p>
      <a
        href="https://github.com/tHALL3000/pt-in-your-pocket"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#fdf8f0",
          fontWeight: 700,
          whiteSpace: "nowrap",
          textDecoration: "underline",
          flexShrink: 0,
        }}
      >
        Set up your own →
      </a>
    </div>
  );
}
