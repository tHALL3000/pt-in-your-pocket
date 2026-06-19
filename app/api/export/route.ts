import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

export const runtime = "edge";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { ptEmail } = await req.json();
  if (!ptEmail) return NextResponse.json({ error: "Missing PT email" }, { status: 400 });

  const admin = createAdminClient();
  const { data: logs } = await admin
    .from("PtWorkoutLog")
    .select("*, entries:PtExerciseEntry(repsDone, setsDone, exercise:PtExercise(name))")
    .order("date", { ascending: true });

  if (!logs) return NextResponse.json({ error: "No data" }, { status: 500 });

  const rows = logs
    .map((log: {
      date: string;
      painLevel: number | null;
      notes: string | null;
      entries: { repsDone: number; setsDone: number; exercise: { name: string } }[];
    }) => {
      const totalReps = log.entries.reduce((sum: number, e: { repsDone: number }) => sum + e.repsDone, 0);
      const exerciseLines = log.entries
        .map((e: { repsDone: number; setsDone: number; exercise: { name: string } }) =>
          `&nbsp;&nbsp;&nbsp;&nbsp;• ${e.exercise.name}: ${e.repsDone} reps × ${e.setsDone} sets`
        )
        .join("<br/>");
      return `
        <tr style="border-bottom:1px solid #e5e7eb;">
          <td style="padding:8px 12px;font-weight:600;">${log.date}</td>
          <td style="padding:8px 12px;">${totalReps} total reps<br/><small style="color:#6b7280;">${exerciseLines}</small></td>
          <td style="padding:8px 12px;text-align:center;">${log.painLevel ?? "—"}/10</td>
          <td style="padding:8px 12px;color:#6b7280;">${log.notes ?? ""}</td>
        </tr>`;
    })
    .join("");

  const html = `
    <div style="font-family:Georgia,serif;max-width:700px;margin:0 auto;color:#333;">
      <h1 style="color:#3d6b4a;font-size:22px;">PT Progress Report</h1>
      <p style="color:#666;">Generated ${new Date().toLocaleDateString("en-US", { dateStyle: "long" })}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:14px;">
        <thead>
          <tr style="background:#f0e8d8;">
            <th style="padding:8px 12px;text-align:left;">Date</th>
            <th style="padding:8px 12px;text-align:left;">Exercises</th>
            <th style="padding:8px 12px;text-align:center;">Pain</th>
            <th style="padding:8px 12px;text-align:left;">Notes</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:24px;color:#888;font-size:12px;">Sent from PT Companion — Home Recovery App</p>
    </div>`;

  const { error } = await resend.emails.send({
    from: "PT Companion <onboarding@resend.dev>",
    to: ptEmail,
    subject: "PT Progress Report — " + new Date().toLocaleDateString("en-US", { dateStyle: "long" }),
    html,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
