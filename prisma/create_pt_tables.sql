-- PT Companion tables — safe to run against shared Supabase DB
-- Uses IF NOT EXISTS so it's idempotent

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
