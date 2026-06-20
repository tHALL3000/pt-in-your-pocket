"use client";

import { useEffect, useState, useRef } from "react";
import BottomNav from "@/components/BottomNav";
import CornerDecoration from "@/components/CornerDecoration";

interface LogEntry {
  date: string;
  painLevel: number | null;
  notes: string | null;
  entries: { repsDone: number; setsDone: number; exercise: { name: string } }[];
}

export default function ExportPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [ptEmail, setPtEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const emailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then((d) => {
        setLogs(d.logs ?? []);
        setLoading(false);
      });

    // Scroll to email section if hash present
    if (window.location.hash === "#email") {
      setTimeout(() => emailRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, []);

  async function sendEmail() {
    if (!ptEmail) return;
    setSending(true);
    setEmailStatus("");
    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ptEmail }),
    });
    const data = await res.json();
    if (data.ok) {
      setEmailStatus("✓ Email sent to your PT!");
    } else {
      setEmailStatus("Something went wrong. Please try again.");
    }
    setSending(false);
  }

  return (
    <>
      <main className="flex flex-col gap-6 px-4 pt-6 pb-32" style={{ minHeight: "100dvh" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ margin: 0 }}>Progress Report</h1>
            <p style={{ fontSize: "0.9rem", color: "#8b6355", margin: "4px 0 0" }}>
              {logs.length} sessions recorded
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="rounded-xl px-4 py-3 font-semibold no-print"
            style={{ background: "#3d6b4a", color: "#fdf8f0", fontSize: "0.95rem", border: "none", minHeight: "48px" }}
          >
            🖨 Print
          </button>
        </div>

        {/* Print header */}
        <div className="hidden print:block">
          <h1 style={{ margin: 0 }}>PT Progress Report</h1>
          <p style={{ color: "#666" }}>
            Generated {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}
          </p>
        </div>

        {/* Log table */}
        {loading ? (
          <div className="animate-pulse rounded-2xl" style={{ height: 200, background: "#e8e0d4" }} />
        ) : logs.length === 0 ? (
          <p style={{ color: "#8b6355", textAlign: "center", padding: "2rem" }}>
            No workouts logged yet. Complete your first session and come back!
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {[...logs].reverse().map((log) => {
              const totalReps = log.entries.reduce((s, e) => s + e.repsDone, 0);
              return (
                <div
                  key={log.date}
                  className="print-log-entry witchy-card p-4 flex flex-col gap-2"
                  style={{ background: "#f5eddf", border: "1px solid #e0d0bc" }}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className="print-log-date"
                      style={{
                        fontFamily: "var(--font-cormorant, Georgia, serif)",
                        fontWeight: 700,
                        color: "#3d6b4a",
                        fontSize: "1rem",
                      }}
                    >
                      {new Date(log.date + "T12:00:00").toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <div className="flex gap-3">
                      <span className="print-log-reps" style={{ fontSize: "0.9rem", color: "#3d6b4a" }}>
                        {totalReps} total reps
                      </span>
                      {log.painLevel && (
                        <span className="print-log-reps" style={{ fontSize: "0.9rem", color: "#b87d7d" }}>
                          Pain: {log.painLevel}/10
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {log.entries.map((e, i) => (
                      <span
                        key={i}
                        className="print-log-exercise-tag rounded-lg px-2 py-0.5"
                        style={{ fontSize: "0.8rem", background: "#e8f0e4", color: "#3d6b4a" }}
                      >
                        {e.exercise.name}: {e.repsDone} reps
                      </span>
                    ))}
                  </div>

                  {log.notes && (
                    <p className="print-log-notes" style={{ margin: 0, fontSize: "0.9rem", color: "#5c4033", fontStyle: "italic" }}>
                      &ldquo;{log.notes}&rdquo;
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Email section */}
        <div
          ref={emailRef}
          id="email"
          className="witchy-card p-5 flex flex-col gap-4 no-print"
          style={{ background: "#e8f0e4", border: "2px solid #87a878" }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Email to Your PT</h2>
            <p style={{ margin: "6px 0 0", fontSize: "0.9rem", color: "#5c4033" }}>
              Send your full progress history directly to your physical therapist.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="pt-email"
              style={{ fontSize: "0.95rem", fontWeight: 600, color: "#3d6b4a" }}
            >
              Your PT&apos;s email address
            </label>
            <input
              id="pt-email"
              type="email"
              value={ptEmail}
              onChange={(e) => { setPtEmail(e.target.value); setEmailStatus(""); }}
              placeholder="pt@example.com"
              style={{
                background: "#fdf8f0",
                border: "2px solid #d4c4ac",
                borderRadius: "12px",
                padding: "12px 14px",
                fontSize: "1rem",
                color: "#5c4033",
                minHeight: "52px",
              }}
            />
          </div>

          <button
            onClick={sendEmail}
            disabled={sending || !ptEmail}
            style={{
              background: ptEmail ? "#3d6b4a" : "#c5b4a0",
              color: "#fdf8f0",
              border: "none",
              borderRadius: "14px",
              padding: "1rem",
              fontSize: "1.1rem",
              fontWeight: 700,
              minHeight: "60px",
            }}
          >
            {sending ? "Sending…" : "Send to PT"}
          </button>

          {emailStatus && (
            <p style={{ margin: 0, fontWeight: 600, color: emailStatus.startsWith("✓") ? "#3d6b4a" : "#b87d7d" }}>
              {emailStatus}
            </p>
          )}
        </div>
      </main>

      <CornerDecoration src="/decorations/bottom-left-corner-flower.png" corner="bottom-left" />
      <BottomNav />
    </>
  );
}
