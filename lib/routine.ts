export type RoutineLevel = "starter" | "building" | "full";

export const ROUTINE_LIMITS: Record<RoutineLevel, number> = {
  starter: 4,
  building: 8,
  full: 999,
};

export const ROUTINE_META: Record<RoutineLevel, { label: string; count: number; desc: string }> = {
  starter:  { label: "Starter",      count: 4,  desc: "Gentle, non-standing exercises · 1× a day, 3–4 days a week" },
  building: { label: "Building up",  count: 8,  desc: "Adds seated and lying strength work" },
  full:     { label: "Full routine", count: 12, desc: "The complete program" },
};

const KEY = "pt_routine_level";
const DEFAULT: RoutineLevel = "starter";

export function readRoutineLevel(): RoutineLevel {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const v = localStorage.getItem(KEY);
    if (v === "starter" || v === "building" || v === "full") return v;
  } catch {}
  return DEFAULT;
}

export function writeRoutineLevel(level: RoutineLevel): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(KEY, level); } catch {}
}
