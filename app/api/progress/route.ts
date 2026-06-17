import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "edge";

// GET /api/progress — returns all logs (last 90 days) with entries
export async function GET() {
  const admin = createAdminClient();

  const since = new Date();
  since.setDate(since.getDate() - 90);
  const sinceStr = since.toISOString().slice(0, 10);

  const { data: logs, error } = await admin
    .from("PtWorkoutLog")
    .select("*, entries:PtExerciseEntry(repsDone, setsDone, exercise:PtExercise(name))")
    .gte("date", sinceStr)
    .order("date", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ logs });
}
