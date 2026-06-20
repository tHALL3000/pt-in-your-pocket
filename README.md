# PT in Your Pocket

A mobile-first PWA for home physical therapy exercise tracking, built for someone recovering from double knee replacement surgery. Designed for low-vision users: large text, minimal cognitive load, generous tap targets throughout.

## Target User

A 60-year-old woman recovering from double knee replacement surgery. She:

- Has **cataracts** — all text must be large and high-contrast; no small labels, no fine print
- Uses a **single iPhone** — the app is a PWA installed to her Home Screen, no other devices
- Is **not technical** — the UI must be immediately obvious with no onboarding or login friction
- Exercises at home, alone — needs clear demos (animations + YouTube links) to do exercises correctly without a PT present
- Has a **PT she reports to** — progress export (print or email) is a first-class feature
- May have **limited grip strength or dexterity** — all tap targets are minimum 48×48px, large buttons throughout

Every design and font-size decision in this codebase should be evaluated against this profile.

## What it does

- **Today** — Shows your current exercise routine with animated demos, rep/set targets, and YouTube video links. Routine level adjusts in Settings.
- **Log** — Tap to count reps per exercise, rate today's pain level (1–10), add notes. Saves to Supabase.
- **Progress** — Monthly streak calendar, rep/pain trend charts, session history. Tap any chart point to see that day's notes.
- **Exercises** — Full library of exercises with position tags, safety notes, and animation demos.
- **Export** — Print-friendly progress report or email directly to your physical therapist via Resend.
- **Settings** — Choose routine level (Starter / Building up / Full), enable daily push notification reminders.

A daily motivation banner shows on first open each day and dismisses with one tap.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15, App Router, React 19 |
| Styling | Tailwind CSS v4 + custom garden witch theme |
| Database | Supabase (Postgres via Prisma) |
| Hosting | Cloudflare Pages (`@cloudflare/next-on-pages`) |
| Email | Resend + React Email |
| Push notifications | Web Push (VAPID), service worker |
| Charts | Recharts |
| Animations | Framer Motion (exercise SVG demos) |

**Fonts:** Cormorant Garamond (headings), Crete Round (card labels), Inter (body) — all loaded via `next/font/google`.

## Local development

```bash
npm install
npm run dev
```

Requires a `.env.local` with:

```
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_SUBJECT=
```

## Set Up Your Own

### Prerequisites

- Node.js 20+
- A free [Supabase](https://supabase.com) account
- A free [Resend](https://resend.com) account (for email export)
- Cloudflare Pages or Vercel for hosting

### Steps

```bash
# 1. Clone and install
git clone https://github.com/tHALL3000/pt-in-your-pocket.git
cd pt-in-your-pocket
npm install

# 2. Set up environment
cp .env.example .env.local
# Fill in your Supabase, Resend, and VAPID credentials

# 3. Generate VAPID keys for push notifications
npx web-push generate-vapid-keys

# 4. Run database migrations and seed exercises
npx prisma migrate dev
npx prisma db seed

# 5. Start dev server
npm run dev
```

### Deploy to Cloudflare Pages

1. Push to GitHub
2. Connect repo in the Cloudflare Pages dashboard
3. Build command: `next build`
4. Output directory: `.vercel/output/static`
5. Add all env vars from `.env.example` in the Pages settings

### Deploy to Vercel (simpler alternative)

1. Push to GitHub
2. Import repo at vercel.com
3. Add env vars — Vercel auto-detects Next.js, no extra config needed

### Try demo mode first

Set `NEXT_PUBLIC_DEMO_MODE=true` in `.env.local` to run the app without a database. All data is stored in localStorage — great for trying it out before wiring up credentials.

## Deployment

Deployed automatically via Cloudflare Pages on push to `main`. The build command is `next build` and the output directory is `.vercel/output/static` (handled by `@cloudflare/next-on-pages`).

Manual deploy: push to `main` and let CI handle it. See `wrangler.toml` for project config.

## Routine levels

Exercises have an `order` field (1–12). The routine level filter in `lib/routine.ts` controls how many are shown:

| Level | Exercises shown |
|---|---|
| Starter | 4 (gentle, non-standing) |
| Building up | 8 |
| Full routine | All 12 |

The selected level is persisted in `localStorage` under the key `pt_routine_level`.

## Medical disclaimer

This app is not medical advice. The creator is not a doctor, physical therapist, or licensed healthcare provider. All exercises should be performed only under the guidance and approval of your own physical therapist or physician. Use entirely at your own risk.

## License

Open source. See LICENSE file if present.
