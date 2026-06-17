"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Today", icon: "🌸" },
  { href: "/log", label: "Log", icon: "📋" },
  { href: "/progress", label: "Progress", icon: "🌱" },
  { href: "/exercises", label: "Exercises", icon: "🍃" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 no-print"
      style={{
        background: "#fdf8f0",
        borderTop: "2px solid #b5cca8",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-stretch justify-around">
        {tabs.map((tab) => {
          const active = path === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center flex-1 py-3 gap-0.5"
              style={{
                color: active ? "#3d6b4a" : "#8b6355",
                fontWeight: active ? 700 : 400,
                fontSize: "0.7rem",
                minHeight: "60px",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{tab.icon}</span>
              <span style={{ fontSize: "0.72rem" }}>{tab.label}</span>
              {active && (
                <span
                  style={{
                    display: "block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#3d6b4a",
                    marginTop: "2px",
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
