"use client";

interface PainScaleProps {
  value: number | null;
  onChange: (v: number) => void;
}

const levels = [
  { n: 1, emoji: "😊", label: "No pain" },
  { n: 2, emoji: "🙂", label: "" },
  { n: 3, emoji: "😐", label: "" },
  { n: 4, emoji: "😕", label: "Mild" },
  { n: 5, emoji: "😟", label: "" },
  { n: 6, emoji: "😣", label: "" },
  { n: 7, emoji: "😖", label: "Moderate" },
  { n: 8, emoji: "😩", label: "" },
  { n: 9, emoji: "😭", label: "" },
  { n: 10, emoji: "🤯", label: "Severe" },
];

export default function PainScale({ value, onChange }: PainScaleProps) {
  return (
    <div className="flex flex-col gap-3">
      <label
        style={{
          fontFamily: "var(--font-serif, Georgia, serif)",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#3d6b4a",
        }}
      >
        Pain level today
      </label>

      <div className="grid grid-cols-5 gap-2">
        {levels.map(({ n, emoji }) => {
          const selected = value === n;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              aria-label={`Pain level ${n}`}
              style={{
                background: selected ? "#d4a5a5" : "#f0e8d8",
                border: `2px solid ${selected ? "#b87d7d" : "#ddd0c0"}`,
                borderRadius: "12px",
                padding: "10px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                minHeight: "64px",
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>{emoji}</span>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: selected ? 700 : 400,
                  color: selected ? "#5c4033" : "#8b6355",
                }}
              >
                {n}
              </span>
            </button>
          );
        })}
      </div>

      {value && (
        <p style={{ fontSize: "0.9rem", color: "#8b6355", textAlign: "center" }}>
          {levels.find((l) => l.n === value)?.label || ""}{" "}
          {value <= 3
            ? "Great — keep going!"
            : value <= 6
            ? "Moderate pain. Listen to your body and adjust as needed."
            : "High pain. Consider resting and contacting your PT."}
        </p>
      )}
    </div>
  );
}
