"use client";

import { useEffect, useState } from "react";
import RepCounter from "@/components/RepCounter";
import PainScale from "@/components/PainScale";
import BottomNav from "@/components/BottomNav";

interface Exercise {
  id: string;
  name: string;
  recommendedReps: number;
  recommendedSets: number;
  position: string;
}

interface EntryState {
  repsDone: number;
  setsDone: number;
}

export default function LogPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [entries, setEntries] = useState<Record<string, EntryState>>({});
  const [painLevel, setPainLevel] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().slice(0, 10);
  const displayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/exercises").then((r) => r.json()),
      fetch(`/api/log?date=${today}`).then((r) => r.json()),
    ]).then(([exData, logData]) => {
      const exs: Exercise[] = exData.exercises ?? [];
      setExercises(exs);

      const initial: Record<string, EntryState> = {};
      exs.forEach((ex) => {
        initial[ex.id] = { repsDone: 0, setsDone: ex.recommendedSets };
      });

      if (logData.log) {
        const log = logData.log;
        if (log.painLevel) setPainLevel(log.painLevel);
        if (log.notes) setNotes(log.notes);
        (log.entries ?? []).forEach((e: { exerciseId: string; repsDone: number; setsDone: number }) => {
          if (initial[e.exerciseId]) {
            initial[e.exerciseId] = { repsDone: e.repsDone, setsDone: e.setsDone };
          }
        });
      }

      setEntries(initial);
      setLoading(false);
    });
  }, [today]);

  function setReps(exerciseId: string, repsDone: number) {
    setEntries((prev) => ({ ...prev, [exerciseId]: { ...prev[exerciseId], repsDone } }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    const entryList = Object.entries(entries).map(([exerciseId, e]) => ({
      exerciseId,
      repsDone: e.repsDone,
      setsDone: e.setsDone,
    }));

    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: today, painLevel, notes, entries: entryList }),
    });

    setSaving(false);
    setSaved(true);
  }

  const totalReps = Object.values(entries).reduce((s, e) => s + e.repsDone, 0);

  return (
    <>
      <main className="flex flex-col gap-6 px-4 pt-6 pb-32" style={{ minHeight: "100dvh" }}>
        <div>
          <p style={{ fontSize: "0.9rem", color: "#87a878", fontWeight: 500, margin: 0 }}>
            {displayDate}
          </p>
          <h1 style={{ margin: "4px 0 0" }}>Log Your Workout</h1>
          {totalReps > 0 && (
            <p style={{ fontSize: "0.95rem", color: "#3d6b4a", margin: "4px 0 0", fontWeight: 600 }}>
              {totalReps} reps logged so far 🌿
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl animate-pulse" style={{ height: 110, background: "#e8e0d4" }} />
            ))}
          </div>
        ) : (
          <>
            {/* Rep counters */}
            <section className="flex flex-col gap-3">
              <h2 style={{ margin: 0 }}>Reps Done</h2>
              {exercises.map((ex) => (
                <RepCounter
                  key={ex.id}
                  label={ex.name}
                  value={entries[ex.id]?.repsDone ?? 0}
                  target={ex.recommendedReps}
                  onChange={(v) => setReps(ex.id, v)}
                />
              ))}
            </section>

            <div style={{ borderTop: "2px solid #e0d8cc", margin: "4px 0" }} />

            {/* Pain scale */}
            <section>
              <PainScale value={painLevel} onChange={setPainLevel} />
            </section>

            <div style={{ borderTop: "2px solid #e0d8cc", margin: "4px 0" }} />

            {/* Notes */}
            <section className="flex flex-col gap-2">
              <label
                htmlFor="notes"
                style={{
                  fontFamily: "var(--font-serif, Georgia, serif)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#3d6b4a",
                }}
              >
                Notes for today
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
                placeholder="How did it feel? Anything to remember for next time…"
                rows={4}
                style={{
                  background: "#f5eddf",
                  border: "2px solid #d4c4ac",
                  borderRadius: "14px",
                  padding: "14px",
                  fontSize: "1rem",
                  color: "#5c4033",
                  lineHeight: 1.6,
                  resize: "none",
                  width: "100%",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </section>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="witchy-btn-primary w-full"
              style={saved ? { background: "#87a878" } : undefined}
            >
              {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Today's Log 🌿"}
            </button>
          </>
        )}
      </main>

      <BottomNav />
    </>
  );
}
