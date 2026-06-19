"use client";

import { useEffect, useState } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import BottomNav from "@/components/BottomNav";
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
  order: number;
}

const categories = ["all", "strength", "balance", "flexibility"] as const;
type Filter = (typeof categories)[number];

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exercises")
      .then((r) => r.json())
      .then((d) => {
        setExercises(d.exercises ?? []);
        setLoading(false);
      });
  }, []);

  const filtered =
    filter === "all" ? exercises : exercises.filter((e) => e.category === filter);

  return (
    <>
      <main className="flex flex-col gap-5 px-4 pt-6 pb-32" style={{ minHeight: "100dvh", position: "relative" }}>
        <div>
          <h1 style={{ margin: 0 }}>Exercise Library</h1>
          <p style={{ fontSize: "0.95rem", color: "#8b6355", margin: "4px 0 0" }}>
            {exercises.length} exercises · tap any to expand
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                background: filter === c ? "#3d6b4a" : "#f0e8d8",
                color: filter === c ? "#fdf8f0" : "#5c4033",
                border: "none",
                borderRadius: "20px",
                padding: "8px 18px",
                fontSize: "0.95rem",
                fontWeight: filter === c ? 700 : 400,
                whiteSpace: "nowrap",
                minHeight: "44px",
              }}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {/* Exercise list */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl animate-pulse" style={{ height: 80, background: "#e8e0d4" }} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} compact={false} />
            ))}
            {filtered.length === 0 && (
              <p style={{ textAlign: "center", color: "#8b6355", padding: "2rem" }}>
                No exercises in this category yet.
              </p>
            )}
          </div>
        )}
        <CornerDecoration src="/decorations/bottom-left-corner-flower.png" corner="bottom-left" />
      </main>

      <BottomNav />
    </>
  );
}
