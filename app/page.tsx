"use client";

import { useEffect, useState } from "react";
import MotivationBanner from "@/components/MotivationBanner";
import ExerciseCard from "@/components/ExerciseCard";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import CornerDecoration from "@/components/CornerDecoration";

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
}

export default function TodayPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    fetch("/api/exercises")
      .then((r) => r.json())
      .then((d) => {
        setExercises(d.exercises ?? []);
        setLoading(false);
      });
  }, []);

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
            {exercises.length} exercises · Take your time
          </p>
        </div>

        {/* Quick log CTA */}
        <Link href="/log" className="witchy-btn-primary w-full gap-2 no-print">
          📋 Log today&apos;s workout
        </Link>

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
            {exercises.map((ex) => (
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
