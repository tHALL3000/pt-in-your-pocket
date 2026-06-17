export const motivationMessages: string[] = [
  "Even the tallest oak started as a small seed. You are growing stronger every single day.",
  "You showed up today. That is the whole thing. That is enough.",
  "Rest is part of healing. Movement is too. You are doing both, beautifully.",
  "Your body has been through something remarkable. Every exercise is a thank-you to it.",
  "The garden does not rush the rose. Neither should you rush your healing.",
  "Progress is not always a straight line. Some days are buds. Some days are blooms.",
  "You are stronger than you were last week. Even on the days it does not feel that way.",
  "Every rep is a root going deeper. Keep planting. Keep growing.",
  "Your knee is healing. Your strength is returning. Trust the process.",
  "Like a perennial, you return stronger each season. This is your season.",
  "There is magic in consistency. Each day you practice is a spell cast.",
  "You do not have to feel powerful to be powerful. Showing up is power.",
  "The wildflowers do not apologize for growing at their own pace. Neither should you.",
  "Healing is not linear — it is more like a spiral staircase. You are still climbing.",
  "Every small effort weaves itself into something strong. You are the weaving.",
  "Your PT believes in you. Your body is responding. Keep going.",
  "The moon does not stop being full just because clouds cover it. Your strength is always there.",
  "Movement is medicine. Today you gave yourself a dose.",
  "You made it to today. That alone is worth celebrating.",
  "Nature heals slowly and completely. You are part of nature.",
  "This is hard work. You are doing hard work. That is worth being proud of.",
  "Each morning you choose to try again. That choice changes everything.",
  "Roots before branches. Foundations before flights. You are building something lasting.",
  "You are not behind. You are exactly where healing needs you to be.",
];

export function getDailyMessage(): string {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return motivationMessages[dayOfYear % motivationMessages.length];
}

export const reminderMessages: string[] = [
  "Your exercises are waiting for you — like seeds ready to grow 🌿",
  "Time for today's PT. You have got this, one movement at a time 🌸",
  "Your body is counting on you today. Just a few minutes of movement 🌱",
  "Daily reminder: you are healing, growing, getting stronger 🍃",
  "Today's exercises are ready for you. You always feel better after 🌼",
];

export function getRandomReminderMessage(): string {
  return reminderMessages[Math.floor(Math.random() * reminderMessages.length)];
}
