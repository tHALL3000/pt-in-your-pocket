export const DEMO_EXERCISES = [
  {
    id: "ex-01",
    name: "Ankle Pumps",
    description: "Flex your foot up toward you, then point it away. Repeat in a slow, rhythmic motion. This keeps blood moving and reduces swelling.",
    category: "flexibility",
    position: "sitting" as const,
    recommendedReps: 20,
    recommendedSets: 3,
    safetyNote: "Move only your ankle — keep your knee still and supported.",
    youtubeVideoId: "ZAr78pwJN_g",
    order: 1,
  },
  {
    id: "ex-02",
    name: "Quad Sets",
    description: "Sit with your leg flat. Tighten the muscle on top of your thigh and press the back of your knee down toward the surface. Hold for 5 seconds, then release.",
    category: "strength",
    position: "sitting" as const,
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Do not lift your leg. Just squeeze and hold.",
    youtubeVideoId: "t8OcF4ADaDY",
    order: 2,
  },
  {
    id: "ex-03",
    name: "Heel Slides",
    description: "Lie on your back with your leg straight. Slowly slide your heel toward you, bending your knee as far as comfortable. Slide back out. Go slow and breathe.",
    category: "flexibility",
    position: "lying" as const,
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Stop if you feel sharp pain. A gentle stretch is okay.",
    youtubeVideoId: "Bz0wSFRjH2c",
    order: 3,
  },
  {
    id: "ex-04",
    name: "Short Arc Quads",
    description: "Lie on your back with a rolled towel under your knee. Straighten your leg by lifting your heel off the surface, hold 5 seconds, then lower slowly.",
    category: "strength",
    position: "lying" as const,
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Keep the roll under your knee the whole time. Lower slowly — don't drop.",
    youtubeVideoId: "RGqKrP7lG0w",
    order: 4,
  },
  {
    id: "ex-05",
    name: "Straight Leg Raises",
    description: "Lie on your back. Bend your other knee with foot flat. Tighten the thigh of the straight leg, then lift it to about 45°. Hold 3 seconds, lower slowly.",
    category: "strength",
    position: "lying" as const,
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Keep the working leg straight throughout. Tighten the quad before lifting.",
    youtubeVideoId: "gQob47IBlYQ",
    order: 5,
  },
  {
    id: "ex-06",
    name: "Long Arc Quads",
    description: "Sit at the edge of a chair. Slowly straighten your knee until your leg is extended, hold 3 seconds, then lower back down with control.",
    category: "strength",
    position: "sitting" as const,
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Lower slowly — resist gravity. Do not let the leg drop.",
    youtubeVideoId: "nO81xJN9RhI",
    order: 6,
  },
  {
    id: "ex-07",
    name: "Standing Knee Bends",
    description: "Hold the back of a sturdy chair with both hands. Slowly bend your knee, lifting your heel behind you. Lower slowly. The goal is increasing how far back you can bend.",
    category: "flexibility",
    position: "standing" as const,
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Stand close to the chair. Do not lean forward — keep your back straight.",
    youtubeVideoId: "XfYekgw9eWY",
    order: 7,
  },
  {
    id: "ex-08",
    name: "Standing Hip Abduction",
    description: "Hold a chair with both hands. Keeping your leg straight and toes forward, slowly lift it out to the side about 12 inches. Lower slowly.",
    category: "strength",
    position: "standing" as const,
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Do not lean your body to the side — keep your trunk upright.",
    youtubeVideoId: "svWalRxpQ1c",
    order: 8,
  },
  {
    id: "ex-09",
    name: "Heel Raises",
    description: "Hold a chair with both hands. Rise up slowly onto your toes, hold 3 seconds, then lower slowly. This builds calf strength and improves balance.",
    category: "strength",
    position: "standing" as const,
    recommendedReps: 15,
    recommendedSets: 3,
    safetyNote: "Lower all the way down before rising again. Go slow.",
    youtubeVideoId: "VX5N9YZ1L-E",
    order: 9,
  },
  {
    id: "ex-10",
    name: "Terminal Knee Extension",
    description: "Place a resistance band just above your knee and step back slightly to create tension. From a slight bend, straighten your knee fully. Hold 3 seconds, release.",
    category: "strength",
    position: "standing" as const,
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Start with light resistance. This targets the very last part of knee straightening — important for walking properly.",
    youtubeVideoId: "7xG3MeoLjC0",
    order: 10,
  },
  {
    id: "ex-11",
    name: "Single-Leg Balance",
    description: "Hold a chair lightly with one or both hands. Shift your weight onto one leg and hold for up to 30 seconds. Switch sides. This trains your balance and stability.",
    category: "balance",
    position: "standing" as const,
    recommendedReps: 5,
    recommendedSets: 2,
    safetyNote: "Keep the chair within arm's reach the whole time. Touch it if you need to — that's what it's there for.",
    youtubeVideoId: "J5F2GbSxTvQ",
    order: 11,
  },
  {
    id: "ex-12",
    name: "Step-Ups",
    description: "Stand facing a single step or low stool. Step up with your stronger leg first, bring the other foot up, then step back down leading with the weaker leg.",
    category: "strength",
    position: "standing" as const,
    recommendedReps: 8,
    recommendedSets: 2,
    safetyNote: "Hold a railing or wall if available. Start with a very low step (4 inches). Only add height when this feels easy.",
    youtubeVideoId: "2g6G_GpsBoc",
    order: 12,
  },
];

interface SeedEntry {
  exerciseId: string;
  exerciseName: string;
  repsDone: number;
  setsDone: number;
}

interface SeedLog {
  date: string;
  painLevel: number | null;
  notes: string | null;
  entries: SeedEntry[];
}

// Returns dates as YYYY-MM-DD strings relative to today
function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

const SAMPLE_NOTES: Record<number, string> = {
  28: "First day home. Took it slow.",
  25: "Knee felt stiff this morning but loosened up.",
  22: "Did all my reps. Feeling more confident.",
  18: "A bit tired today, only did half.",
  14: "Good session! Knee barely aching after.",
  10: "The heel slides are getting easier.",
  6:  "Standing exercises feel steadier.",
  2:  "Best session yet. Swelling is way down.",
};

// Which days out of the last 30 had logged workouts (~70% adherence)
const LOGGED_DAYS = [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 18, 20, 22, 24, 25, 26, 28];

export function generateSeedLogs(): SeedLog[] {
  return LOGGED_DAYS.map((daysBack) => {
    // Pain level trends down from 4 early on to 1-2 recently
    const rawPain = Math.round(4 - (daysBack / 30) * 3);
    const painLevel = Math.max(1, Math.min(4, rawPain + (daysBack % 3 === 0 ? 1 : 0)));

    // Rep completion varies — earlier days sometimes partial
    const completion = daysBack > 20 ? 0.7 : daysBack > 10 ? 0.85 : 1;

    const entries: SeedEntry[] = DEMO_EXERCISES.slice(0, 4).map((ex) => ({
      exerciseId: ex.id,
      exerciseName: ex.name,
      repsDone: Math.round(ex.recommendedReps * completion),
      setsDone: ex.recommendedSets,
    }));

    return {
      date: daysAgo(daysBack),
      painLevel,
      notes: SAMPLE_NOTES[daysBack] ?? null,
      entries,
    };
  });
}
