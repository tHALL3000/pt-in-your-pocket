import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const exercises = [
  {
    id: "ex-01",
    name: "Ankle Pumps",
    description: "Flex your foot up toward you, then point it away. Repeat in a slow, rhythmic motion. This keeps blood moving and reduces swelling.",
    category: "flexibility",
    position: "sitting",
    recommendedReps: 20,
    recommendedSets: 3,
    safetyNote: "Move only your ankle — keep your knee still and supported.",
    youtubeVideoId: "3AzfYVwGJoY",
    order: 1,
  },
  {
    id: "ex-02",
    name: "Quad Sets",
    description: "Sit with your leg flat. Tighten the muscle on top of your thigh and press the back of your knee down toward the surface. Hold for 5 seconds, then release.",
    category: "strength",
    position: "sitting",
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Do not lift your leg. Just squeeze and hold.",
    youtubeVideoId: "LFGrMMsAPlE",
    order: 2,
  },
  {
    id: "ex-03",
    name: "Heel Slides",
    description: "Lie on your back with your leg straight. Slowly slide your heel toward you, bending your knee as far as comfortable. Slide back out. Go slow and breathe.",
    category: "flexibility",
    position: "lying",
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Stop if you feel sharp pain. A gentle stretch is okay.",
    youtubeVideoId: "x3mJEdGzl_Q",
    order: 3,
  },
  {
    id: "ex-04",
    name: "Short Arc Quads",
    description: "Lie on your back with a rolled towel under your knee. Straighten your leg by lifting your heel off the surface, hold 5 seconds, then lower slowly.",
    category: "strength",
    position: "lying",
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Keep the roll under your knee the whole time. Lower slowly — don't drop.",
    youtubeVideoId: "AuKVAu_NMYM",
    order: 4,
  },
  {
    id: "ex-05",
    name: "Straight Leg Raises",
    description: "Lie on your back. Bend your other knee with foot flat. Tighten the thigh of the straight leg, then lift it to about 45°. Hold 3 seconds, lower slowly.",
    category: "strength",
    position: "lying",
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Keep the working leg straight throughout. Tighten the quad before lifting.",
    youtubeVideoId: "0KF6XzQQ8SI",
    order: 5,
  },
  {
    id: "ex-06",
    name: "Long Arc Quads",
    description: "Sit at the edge of a chair. Slowly straighten your knee until your leg is extended, hold 3 seconds, then lower back down with control.",
    category: "strength",
    position: "sitting",
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Lower slowly — resist gravity. Do not let the leg drop.",
    youtubeVideoId: "yfPMPd4J7oI",
    order: 6,
  },
  {
    id: "ex-07",
    name: "Standing Knee Bends",
    description: "Hold the back of a sturdy chair with both hands. Slowly bend your knee, lifting your heel behind you. Lower slowly. The goal is increasing how far back you can bend.",
    category: "flexibility",
    position: "standing",
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Stand close to the chair. Do not lean forward — keep your back straight.",
    youtubeVideoId: "LV7ePxW4e9w",
    order: 7,
  },
  {
    id: "ex-08",
    name: "Standing Hip Abduction",
    description: "Hold a chair with both hands. Keeping your leg straight and toes forward, slowly lift it out to the side about 12 inches. Lower slowly.",
    category: "strength",
    position: "standing",
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Do not lean your body to the side — keep your trunk upright.",
    youtubeVideoId: "mMSq0iWUoqY",
    order: 8,
  },
  {
    id: "ex-09",
    name: "Heel Raises",
    description: "Hold a chair with both hands. Rise up slowly onto your toes, hold 3 seconds, then lower slowly. This builds calf strength and improves balance.",
    category: "strength",
    position: "standing",
    recommendedReps: 15,
    recommendedSets: 3,
    safetyNote: "Lower all the way down before rising again. Go slow.",
    youtubeVideoId: "0OmFsRGRpEM",
    order: 9,
  },
  {
    id: "ex-10",
    name: "Terminal Knee Extension",
    description: "Place a resistance band just above your knee and step back slightly to create tension. From a slight bend, straighten your knee fully. Hold 3 seconds, release.",
    category: "strength",
    position: "standing",
    recommendedReps: 10,
    recommendedSets: 3,
    safetyNote: "Start with light resistance. This targets the very last part of knee straightening — important for walking properly.",
    youtubeVideoId: "bXqZ5PBMV7U",
    order: 10,
  },
  {
    id: "ex-11",
    name: "Single-Leg Balance",
    description: "Hold a chair lightly with one or both hands. Shift your weight onto one leg and hold for up to 30 seconds. Switch sides. This trains your balance and stability.",
    category: "balance",
    position: "standing",
    recommendedReps: 5,
    recommendedSets: 2,
    safetyNote: "Keep the chair within arm's reach the whole time. Touch it if you need to — that's what it's there for.",
    youtubeVideoId: "Xe6E_kllG8o",
    order: 11,
  },
  {
    id: "ex-12",
    name: "Step-Ups",
    description: "Stand facing a single step or low stool. Step up with your stronger leg first, bring the other foot up, then step back down leading with the weaker leg.",
    category: "strength",
    position: "standing",
    recommendedReps: 8,
    recommendedSets: 2,
    safetyNote: "Hold a railing or wall if available. Start with a very low step (4 inches). Only add height when this feels easy.",
    youtubeVideoId: "dQqApCGd5Ss",
    order: 12,
  },
];

async function main() {
  console.log("Seeding PT exercises...");
  for (const ex of exercises) {
    const { error } = await supabase
      .from("PtExercise")
      .upsert(ex, { onConflict: "id" });
    if (error) {
      console.error(`Failed to seed ${ex.name}:`, error.message);
    } else {
      console.log(`  ✓ ${ex.name}`);
    }
  }
  console.log("Done.");
}

main();
