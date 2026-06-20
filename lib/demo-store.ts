import { DEMO_EXERCISES, generateSeedLogs } from "./demo-data";

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

const STORAGE_KEY = "pt-demo-logs";
const INIT_KEY = "pt-demo-initialized";

interface DemoEntry {
  exerciseId: string;
  exerciseName: string;
  repsDone: number;
  setsDone: number;
}

interface DemoLog {
  date: string;
  painLevel: number | null;
  notes: string | null;
  entries: DemoEntry[];
}

function readStore(): Record<string, DemoLog> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, DemoLog>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // storage full or unavailable — silently ignore in demo
  }
}

// Called once on first page load in demo mode
export function initDemoData(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(INIT_KEY)) return;

  const store: Record<string, DemoLog> = {};
  for (const log of generateSeedLogs()) {
    store[log.date] = log;
  }
  writeStore(store);
  localStorage.setItem(INIT_KEY, "1");
}

export function getDemoExercises() {
  return { exercises: DEMO_EXERCISES };
}

export function getDemoLog(date: string): { log: DemoLog | null } {
  const store = readStore();
  return { log: store[date] ?? null };
}

export function saveDemoLog(
  date: string,
  payload: {
    painLevel: number | null;
    notes: string;
    entries: { exerciseId: string; repsDone: number; setsDone: number }[];
  }
): { ok: boolean } {
  const store = readStore();
  const enrichedEntries: DemoEntry[] = payload.entries.map((e) => ({
    ...e,
    exerciseName: DEMO_EXERCISES.find((ex) => ex.id === e.exerciseId)?.name ?? e.exerciseId,
  }));
  store[date] = { date, painLevel: payload.painLevel, notes: payload.notes, entries: enrichedEntries };
  writeStore(store);
  return { ok: true };
}

export function getDemoProgress(): {
  logs: { date: string; painLevel: number | null; notes: string | null; entries: { repsDone: number; exercise: { name: string } }[] }[];
} {
  const store = readStore();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  const logs = Object.values(store)
    .filter((l) => l.date >= cutoffStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((l) => ({
      date: l.date,
      painLevel: l.painLevel,
      notes: l.notes,
      entries: l.entries.map((e) => ({
        repsDone: e.repsDone,
        exercise: { name: e.exerciseName },
      })),
    }));

  return { logs };
}
