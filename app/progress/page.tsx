"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

interface LogEntry {
  date: string;
  painLevel: number | null;
  notes: string | null;
  entries: { repsDone: number; exercise: { name: string } }[];
}

function StreakCalendar({ logs }: { logs: LogEntry[] }) {
  const doneDates = new Set(logs.map((l) => l.date));
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="flex flex-col gap-3 rounded-2xl p-4" style={{ background: "#f5eddf", border: "2px solid #e0d0bc" }}>
      <h2 style={{ margin: 0, fontSize: "1.15rem" }}>{monthName}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: "0.72rem", color: "#8b6355", fontWeight: 600 }}>
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isToday = day === today.getDate();
          const done = doneDates.has(dateStr);
          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                borderRadius: "8px",
                padding: "5px 0",
                fontSize: "0.9rem",
                fontWeight: isToday ? 700 : 400,
                background: done ? "#3d6b4a" : isToday ? "#f0e8d8" : "transparent",
                color: done ? "#fdf8f0" : isToday ? "#3d6b4a" : "#5c4033",
                border: isToday && !done ? "2px solid #87a878" : "none",
              }}
            >
              {done ? "🌿" : day}
            </div>
          );
        })}
      </div>
      <p style={{ margin: 0, fontSize: "0.85rem", color: "#8b6355", textAlign: "center" }}>
        🌿 = workout completed
      </p>
    </div>
  );
}

export default function ProgressPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"reps" | "pain">("reps");
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then((d) => {
        setLogs(d.logs ?? []);
        setLoading(false);
      });
  }, []);

  const chartData = logs.map((log) => ({
    date: log.date.slice(5),
    reps: log.entries.reduce((s, e) => s + e.repsDone, 0),
    pain: log.painLevel ?? null,
  }));

  const currentStreak = (() => {
    const today = new Date().toISOString().slice(0, 10);
    let streak = 0;
    const checkDate = new Date();
    const doneDates = new Set(logs.map((l) => l.date));
    while (true) {
      const d = checkDate.toISOString().slice(0, 10);
      if (d === today || doneDates.has(d)) {
        if (doneDates.has(d)) streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else break;
    }
    return streak;
  })();

  return (
    <>
      <main className="flex flex-col gap-6 px-4 pt-6 pb-32" style={{ minHeight: "100dvh" }}>
        <div>
          <h1 style={{ margin: 0 }}>Your Progress</h1>
          <p style={{ fontSize: "0.95rem", color: "#8b6355", margin: "4px 0 0" }}>
            Last 90 days
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-2xl animate-pulse" style={{ height: 140, background: "#e8e0d4" }} />
            ))}
          </div>
        ) : (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Day Streak 🔥", value: currentStreak },
                { label: "Sessions", value: logs.length },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl p-4 flex flex-col gap-1"
                  style={{ background: "#f5eddf", border: "2px solid #e0d0bc" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-lora, Georgia, serif)",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#3d6b4a",
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "#8b6355" }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Calendar */}
            <StreakCalendar logs={logs} />

            {/* Chart */}
            {logs.length > 1 && (
              <div className="flex flex-col gap-3 rounded-2xl p-4" style={{ background: "#f5eddf", border: "2px solid #e0d0bc" }}>
                <div className="flex gap-2">
                  {(["reps", "pain"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      style={{
                        background: tab === t ? "#3d6b4a" : "#f0e8d8",
                        color: tab === t ? "#fdf8f0" : "#5c4033",
                        border: "none",
                        borderRadius: "10px",
                        padding: "8px 16px",
                        fontSize: "0.9rem",
                        fontWeight: tab === t ? 700 : 400,
                      }}
                    >
                      {t === "reps" ? "Total Reps" : "Pain Level"}
                    </button>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={chartData} onClick={(d) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const payload = (d as any)?.activePayload?.[0]?.payload?.date as string | undefined;
                    if (payload) {
                      const found = logs.find((l) => l.date.slice(5) === payload);
                      if (found) setSelectedLog(found);
                    }
                  }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0d0bc" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8b6355" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#8b6355" }} />
                    <Tooltip
                      contentStyle={{ background: "#fdf8f0", border: "1px solid #d4c4ac", borderRadius: 10 }}
                      labelStyle={{ color: "#3d6b4a", fontWeight: 600 }}
                    />
                    <Line
                      type="monotone"
                      dataKey={tab}
                      stroke="#3d6b4a"
                      strokeWidth={2.5}
                      dot={{ fill: "#87a878", r: 4 }}
                      activeDot={{ r: 6, fill: "#3d6b4a" }}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p style={{ fontSize: "0.8rem", color: "#8b6355", margin: 0, textAlign: "center" }}>
                  Tap a point to see that day&apos;s notes
                </p>
              </div>
            )}

            {/* Day detail modal */}
            {selectedLog && (
              <div
                className="fixed inset-0 z-50 flex items-end p-4"
                style={{ background: "rgba(61,107,74,0.4)" }}
                onClick={() => setSelectedLog(null)}
              >
                <div
                  className="w-full rounded-2xl p-5 flex flex-col gap-3"
                  style={{ background: "#fdf8f0", border: "2px solid #87a878" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center">
                    <h3 style={{ margin: 0 }}>{selectedLog.date}</h3>
                    <button onClick={() => setSelectedLog(null)} style={{ fontSize: "1.4rem", background: "none", border: "none", color: "#8b6355" }}>✕</button>
                  </div>
                  <p style={{ margin: 0, color: "#3d6b4a" }}>
                    Total reps: <strong>{selectedLog.entries.reduce((s, e) => s + e.repsDone, 0)}</strong>
                  </p>
                  {selectedLog.painLevel && (
                    <p style={{ margin: 0, color: "#b87d7d" }}>
                      Pain level: <strong>{selectedLog.painLevel}/10</strong>
                    </p>
                  )}
                  {selectedLog.notes && (
                    <p style={{ margin: 0, color: "#5c4033", fontStyle: "italic", lineHeight: 1.5 }}>
                      &ldquo;{selectedLog.notes}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Export CTA */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{ background: "#e8f0e4", border: "2px solid #87a878" }}
            >
              <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Share with your PT</h2>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#5c4033" }}>
                Print your full history or email it directly to your physical therapist.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/export"
                  className="flex-1 rounded-xl py-3 text-center font-semibold"
                  style={{ background: "#3d6b4a", color: "#fdf8f0", textDecoration: "none", fontSize: "1rem" }}
                >
                  View &amp; Print
                </Link>
                <Link
                  href="/export#email"
                  className="flex-1 rounded-xl py-3 text-center font-semibold"
                  style={{ background: "#f0e8d8", color: "#3d6b4a", textDecoration: "none", fontSize: "1rem", border: "2px solid #d4b896" }}
                >
                  Email PT
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </>
  );
}
