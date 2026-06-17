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
  const [showVideo, setShowVideo] = useState(false);

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
          {exercise.youtubeVideoId && showVideo ? (
            <div className="rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${exercise.youtubeVideoId}?rel=0&modestbranding=1`}
                title={`How to do ${exercise.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <ExerciseAnimation
                position={exercise.position as "sitting" | "standing" | "lying"}
                category={exercise.category}
              />
              {exercise.youtubeVideoId && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="rounded-xl py-2 text-sm font-medium"
                  style={{
                    background: "#f0e8d8",
                    border: "1px solid #d4b896",
                    color: "#5c4033",
                  }}
                >
                  ▶ Watch video demo
                </button>
              )}
            </div>
          )}

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
