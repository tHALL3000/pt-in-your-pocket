# PT in Your Pocket

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tHALL3000/pt-in-your-pocket&env=NEXT_PUBLIC_DEMO_MODE&envDescription=Set%20to%20true%20to%20run%20without%20a%20database%20%28localStorage%20only%29&envLink=https://github.com/tHALL3000/pt-in-your-pocket%23set-up-your-own)

## DEMO SITE
https://pt-in-your-pocket-iwp7db3ow-thall3000s-projects.vercel.app/

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

## Screenshots
<img width="310" height="669" alt="today" src="https://github.com/user-attachments/assets/448d6da5-c148-4d34-a846-b8a8a82ade57" />
<img width="301" height="663" alt="heel-slide" src="https://github.com/user-attachments/assets/5ab27867-e0d2-4e6b-a422-439dea5c2305" />
<img width="310" height="669" alt="ankle" src="https://github.com/user-attachments/assets/02fac6e8-e8eb-476f-ad3f-80b411fbebb0" />
<img width="309" height="665" alt="log-1" src="https://github.com/user-attachments/assets/111a8d33-6981-4935-b475-f747d3257974" />
<img width="306" height="636" alt="log-2" src="https://github.com/user-attachments/assets/49efbbb7-5c94-409e-9d16-04a94118a075" />
<img width="304" height="668" alt="progress-1" src="https://github.com/user-attachments/assets/57abf191-653b-4a2d-8d7d-b303d2d47c82" />
<img width="305" height="598" alt="progress-2" src="https://github.com/user-attachments/assets/7a269663-4263-4d69-9b4a-6df640ffa0c5" />
<img width="309" height="665" alt="library" src="https://github.com/user-attachments/assets/ddef6254-1123-46e3-b8bc-0cb3d9c5333e" />
<img width="307" height="669" alt="setting" src="https://github.com/user-attachments/assets/b4b5ba9d-4e96-4eec-a359-1e06db76b4cf" />



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

Open source. CC BY-NC 4.0 | https://creativecommons.org/licenses/by-nc/4.0/
You are free to:
Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material
The licensor cannot revoke these freedoms as long as you follow the license terms.

Under the following terms:
Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
NonCommercial — You may not use the material for commercial purposes.
No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

Notices:
You do not have to comply with the license for elements of the material in the public domain or where your use is permitted by an applicable exception or limitation.

No warranties are given. The license may not give you all of the permissions necessary for your intended use. For example, other rights such as publicity, privacy, or moral rights may limit how you use the material.
