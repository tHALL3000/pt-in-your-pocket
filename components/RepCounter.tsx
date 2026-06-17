"use client";

interface RepCounterProps {
  label: string;
  value: number;
  target: number;
  onChange: (v: number) => void;
}

export default function RepCounter({ label, value, target, onChange }: RepCounterProps) {
  const done = value >= target;

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-2xl"
      style={{
        background: done ? "#e8f0e4" : "#fdf8f0",
        border: `2px solid ${done ? "#87a878" : "#e0d8cc"}`,
        transition: "all 0.2s ease",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          style={{
            fontFamily: "var(--font-lora, Georgia, serif)",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#3d6b4a",
          }}
        >
          {label}
        </span>
        {done && <span style={{ fontSize: "1.25rem" }}>✅</span>}
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          aria-label={`Decrease ${label}`}
          style={{
            background: "#f0e8d8",
            border: "2px solid #d4b896",
            borderRadius: "12px",
            width: "60px",
            height: "60px",
            fontSize: "1.75rem",
            color: "#5c4033",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          −
        </button>

        <div className="flex-1 text-center">
          <span
            style={{
              fontFamily: "var(--font-lora, Georgia, serif)",
              fontSize: "2.5rem",
              fontWeight: 700,
              color: done ? "#3d6b4a" : "#5c4033",
              lineHeight: 1,
            }}
          >
            {value}
          </span>
          <div style={{ fontSize: "0.85rem", color: "#8b6355", marginTop: "4px" }}>
            of {target} reps
          </div>
        </div>

        <button
          onClick={() => onChange(value + 1)}
          aria-label={`Increase ${label}`}
          style={{
            background: "#3d6b4a",
            border: "none",
            borderRadius: "12px",
            width: "60px",
            height: "60px",
            fontSize: "1.75rem",
            color: "#fdf8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
