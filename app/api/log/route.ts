import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "edge";

// GET /api/log?date=YYYY-MM-DD
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? new Date().toISOString().slice(0, 10);

  const admin = createAdminClient();

  const { data: log } = await admin
    .from("PtWorkoutLog")
    .select("*, entries:PtExerciseEntry(*, exercise:PtExercise(name))")
    .eq("date", date)
    .maybeSingle();

  return NextResponse.json({ log });
}

// POST /api/log — upsert a log and its exercise entries
export async function POST(req: Request) {
  const body = await req.json();
  const { date, painLevel, notes, entries } = body as {
    date: string;
    painLevel?: number;
    notes?: string;
    entries: { exerciseId: string; repsDone: number; setsDone: number }[];
  };

  const admin = createAdminClient();

  // Upsert the log record — id must be provided since cuid() is Prisma-side only
  const { data: log, error: logError } = await admin
    .from("PtWorkoutLog")
    .upsert(
      { id: crypto.randomUUID(), date, painLevel: painLevel ?? null, notes: notes ?? null },
      { onConflict: "date" }
    )
    .select()
    .single();

  if (logError || !log) {
    return NextResponse.json({ error: logError?.message ?? "Failed to save log" }, { status: 500 });
  }

  // Delete existing entries for this log, then re-insert
  await admin.from("PtExerciseEntry").delete().eq("logId", log.id);

  if (entries.length > 0) {
    const rows = entries.map((e) => ({
      id: crypto.randomUUID(),
      logId: log.id,
      exerciseId: e.exerciseId,
      repsDone: e.repsDone,
      setsDone: e.setsDone,
    }));
    const { error: entryError } = await admin.from("PtExerciseEntry").insert(rows);
    if (entryError) {
      return NextResponse.json({ error: entryError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ log });
}
