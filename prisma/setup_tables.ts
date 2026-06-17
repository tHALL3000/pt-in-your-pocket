import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const sql = `
CREATE TABLE IF NOT EXISTS "PtExercise" (
  "id"              TEXT NOT NULL PRIMARY KEY,
  "name"            TEXT NOT NULL,
  "description"     TEXT NOT NULL,
  "category"        TEXT NOT NULL,
  "position"        TEXT NOT NULL,
  "recommendedReps" INTEGER NOT NULL,
  "recommendedSets" INTEGER NOT NULL,
  "safetyNote"      TEXT,
  "youtubeVideoId"  TEXT,
  "order"           INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "PtWorkoutLog" (
  "id"        TEXT NOT NULL PRIMARY KEY,
  "date"      TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "painLevel" INTEGER,
  "notes"     TEXT
);

CREATE TABLE IF NOT EXISTS "PtExerciseEntry" (
  "id"         TEXT NOT NULL PRIMARY KEY,
  "logId"      TEXT NOT NULL REFERENCES "PtWorkoutLog"("id") ON DELETE CASCADE,
  "exerciseId" TEXT NOT NULL REFERENCES "PtExercise"("id"),
  "repsDone"   INTEGER NOT NULL DEFAULT 0,
  "setsDone"   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "PtPushSubscription" (
  "id"        TEXT NOT NULL PRIMARY KEY,
  "endpoint"  TEXT NOT NULL UNIQUE,
  "p256dh"    TEXT NOT NULL,
  "auth"      TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

async function main() {
  console.log("Creating PT tables...");
  const { error } = await supabase.rpc("exec_sql", { query: sql }).single();
  if (error) {
    // Supabase doesn't have exec_sql by default — use the SQL editor approach
    // Fall back to individual table creation checks via select
    console.log("RPC not available, trying alternative approach...");

    // Check if tables already exist by querying them
    const tables = ["PtExercise", "PtWorkoutLog", "PtExerciseEntry", "PtPushSubscription"];
    for (const table of tables) {
      const { error: selectErr } = await supabase.from(table).select("id").limit(1);
      if (selectErr?.code === "42P01") {
        console.error(`Table ${table} does not exist and could not be created via API.`);
        console.error("Please run the SQL in prisma/create_pt_tables.sql via the Supabase dashboard SQL editor.");
        process.exit(1);
      } else {
        console.log(`  ✓ ${table} — exists`);
      }
    }
  } else {
    console.log("Tables created successfully.");
  }
}

main();
