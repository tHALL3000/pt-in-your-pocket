"use client";

import { useEffect, useState } from "react";
import MotivationBanner from "@/components/MotivationBanner";
import ExerciseCard from "@/components/ExerciseCard";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import CornerDecoration from "@/components/CornerDecoration";
import { type RoutineLevel, ROUTINE_LIMITS, ROUTINE_META, readRoutineLevel } from "@/lib/routine";
import { DEMO_MODE, initDemoData, getDemoExercises } from "@/lib/demo-store";

interface Exercise {
  id: string;
  name: string;
  description: string;
  category: string;
  position: "sitting" | "standing" | "lying";
  recommendedReps: number;
  recommendedSets: number;
  safetyNote?: string | null;
  youtubeVideoId?: string | null;
  order: number;
}

export default function TodayPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [routineLevel, setRoutineLevel] = useState<RoutineLevel>("starter");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    setRoutineLevel(readRoutineLevel()); // eslint-disable-line react-hooks/set-state-in-effect
    if (DEMO_MODE) {
      initDemoData();
      const d = getDemoExercises();
      setExercises(d.exercises ?? []); // eslint-disable-line react-hooks/set-state-in-effect
      setLoading(false); // eslint-disable-line react-hooks/set-state-in-effect
      return;
    }
    fetch("/api/exercises")
      .then((r) => r.json())
      .then((d) => {
        setExercises(d.exercises ?? []);
        setLoading(false);
      });
  }, []);

  const visibleExercises = exercises.filter((ex) => ex.order <= ROUTINE_LIMITS[routineLevel]);
  const meta = ROUTINE_META[routineLevel];

  return (
    <>
      <MotivationBanner />

      <main
        className="flex flex-col gap-5 px-4 pt-6 pb-28 leaf-bg"
        style={{ minHeight: "100dvh", position: "relative" }}
      >
        {/* Header */}
        <div className="flex flex-col gap-1">
          <p style={{ fontSize: "0.9rem", color: "#87a878", fontWeight: 500 }}>{today}</p>
          <h1 style={{ margin: 0 }}>Today&apos;s Exercises</h1>
          <p style={{ fontSize: "0.95rem", color: "#8b6355", margin: 0 }}>
            {meta.label} · {visibleExercises.length} exercises · Take your time
          </p>
        </div>

        {/* Quick log CTA */}
        <Link href="/log" className="witchy-btn-primary w-full gap-2 no-print">
          📋 Log today&apos;s workout
        </Link>

        {/* Routine callout */}
        {routineLevel !== "full" && !loading && (
          <div
            className="rounded-xl px-4 py-3 flex items-center justify-between gap-3"
            style={{ background: "#eaf2ea", border: "1px solid #b5cca8" }}
          >
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#3d6b4a", lineHeight: 1.5 }}>
              🌱 {meta.desc}
            </p>
            <Link
              href="/settings"
              style={{ fontSize: "0.85rem", color: "#3d6b4a", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}
            >
              Change →
            </Link>
          </div>
        )}

        {/* Exercise list */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl animate-pulse"
                style={{ height: 80, background: "#e8e0d4" }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleExercises.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} compact />
            ))}
          </div>
        )}
        <CornerDecoration src="/decorations/bottom-right-corner-root.png" corner="bottom-right" />
      </main>

      <BottomNav />
    </>
  );
}
