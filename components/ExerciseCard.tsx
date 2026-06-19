"use client";

import { useState } from "react";
import ExerciseAnimation from "./ExerciseAnimation";

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

interface ExerciseCardProps {
  exercise: Exercise;
  compact?: boolean;
}

const positionLabel: Record<string, string> = {
  sitting: "🪑 Sitting",
  standing: "🧍 Standing",
  lying: "🛌 Lying down",
};

const categoryColor: Record<string, string> = {
  strength: "#c5b4e3",
  balance: "#87a878",
  flexibility: "#d4a5a5",
};

export default function ExerciseCard({ exercise, compact = false }: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(!compact);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#fdf8f0",
        border: "2px solid #e0d8cc",
        boxShadow: "0 4px 18px rgba(61,107,74,0.08)",
      }}
    >
      {/* Header */}
      <button
        className="w-full text-left p-4 flex items-start justify-between gap-3"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex-1">
          <h3
            style={{
              fontFamily: "var(--font-lora, Georgia, serif)",
              fontSize: "1.2rem",
              color: "#3d6b4a",
              margin: 0,
            }}
          >
            {exercise.name}
          </h3>
          <div className="flex flex-wrap gap-2 mt-1">
            <span
              className="rounded-full px-3 py-0.5 text-sm font-medium"
              style={{ background: "#f0e8d8", color: "#5c4033" }}
            >
              {positionLabel[exercise.position] ?? exercise.position}
            </span>
            <span
              className="rounded-full px-3 py-0.5 text-sm font-medium"
              style={{
                background: categoryColor[exercise.category] ?? "#e0d8cc",
                color: "#3d6b4a",
              }}
            >
              {exercise.category}
            </span>
            <span
              className="rounded-full px-3 py-0.5 text-sm"
              style={{ background: "#e8f0e4", color: "#3d6b4a" }}
            >
              {exercise.recommendedReps} reps × {exercise.recommendedSets} sets
            </span>
          </div>
        </div>
        <span style={{ fontSize: "1.25rem", color: "#87a878", flexShrink: 0 }}>
          {expanded ? "▲" : "▼"}
        </span>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="px-4 pb-5 flex flex-col gap-4">
          {/* Demo */}
          <div className="flex flex-col gap-2">
            <ExerciseAnimation
              position={exercise.position as "sitting" | "standing" | "lying"}
              category={exercise.category}
            />
            {exercise.youtubeVideoId && (
              <a
                href={`https://www.youtube.com/watch?v=${exercise.youtubeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl overflow-hidden block relative"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={`https://img.youtube.com/vi/${exercise.youtubeVideoId}/hqdefault.jpg`}
                  alt={`Video demo: ${exercise.name}`}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.25)" }}
                >
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: 64, height: 64, background: "rgba(255,255,255,0.92)" }}
                  >
                    <span style={{ fontSize: "1.8rem", marginLeft: 4 }}>▶</span>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-2"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <p style={{ color: "#fff", fontSize: "0.8rem", margin: 0 }}>
                    ▶ Tap to watch on YouTube
                  </p>
                </div>
              </a>
            )}
          </div>

          {/* Description */}
          <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "#5c4033", margin: 0 }}>
            {exercise.description}
          </p>

          {/* Safety note */}
          {exercise.safetyNote && (
            <div
              className="rounded-xl p-3 flex gap-2"
              style={{ background: "#fff8ec", border: "1px solid #e8d0a0" }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>⚠️</span>
              <p style={{ fontSize: "0.9rem", color: "#7a5c1e", margin: 0, lineHeight: 1.5 }}>
                {exercise.safetyNote}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
