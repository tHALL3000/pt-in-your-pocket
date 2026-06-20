# ADR-001: Architecture Decisions for PT in Your Pocket

**Status:** Accepted  
**Date:** 2026-06-19

---

## Context

A personal physical therapy companion app for a single user recovering from double knee replacement surgery. The target user is a 60-year-old woman with cataracts. The app must work reliably on an iPhone, be installable as a PWA (home screen), require no login friction, and be maintainable by one developer.

---

## Decisions

### 1. Next.js 15 App Router on Cloudflare Pages

**Decision:** Use Next.js with the App Router, deployed to Cloudflare Pages via `@cloudflare/next-on-pages`.

**Reasons:**
- Cloudflare Pages has a generous free tier with no cold-start latency penalty for edge functions, which matters for a PWA that should feel instant.
- Next.js App Router gives file-based routing, server components, and edge-compatible API routes in one framework without needing a separate backend.
- `@cloudflare/next-on-pages` handles the adapter layer; API routes run as Cloudflare Workers at the edge.

**Trade-offs:**
- Some Next.js features are not supported on the edge runtime (e.g., Prisma's Node.js client). Prisma is used only at seed/migration time; runtime queries go through Supabase's HTTP client.
- Build config is slightly non-standard (`pages_build_output_dir = ".vercel/output/static"`).

---

### 2. Supabase as the database layer

**Decision:** Use Supabase (managed Postgres) with the `@supabase/supabase-js` client at runtime and Prisma only for schema management and seeding.

**Reasons:**
- Prisma's Node.js runtime is not compatible with Cloudflare Workers. Supabase's JS client is edge-compatible via HTTP.
- Supabase provides a free tier sufficient for a single-user app and handles connection pooling automatically.
- Prisma schema (`prisma/schema.prisma`) remains the source of truth for the data model; `prisma migrate` and `prisma db seed` run locally or in CI, never in the edge runtime.

**Trade-offs:**
- Two database clients in the project (`@supabase/supabase-js` for runtime, `@prisma/client` for seeding) adds some conceptual overhead.
- All queries at runtime must be written against Supabase's client API rather than Prisma's ORM syntax.

---

### 3. No authentication

**Decision:** The app has no login system. It runs as a single-user PWA installed on one person's phone.

**Reasons:**
- The target user has cataracts and motor limitations — a login screen adds friction and cognitive load with no benefit (only one person uses this device/app).
- Data sensitivity is low; the worst case of unauthorized access is someone seeing an exercise log.
- Removing auth eliminates an entire class of bugs, session expiry issues, and maintenance surface.

**Trade-offs:**
- If the app were ever opened from a different device, it would show that device's local data (localStorage keys) and make API calls that could theoretically hit the shared Supabase table.
- Acceptable for the stated use case; would need to revisit if the app were shared with other users.

---

### 4. PWA with Web Push for daily reminders

**Decision:** Ship as a Progressive Web App with a service worker (`public/sw.js`) and VAPID-based Web Push for daily exercise reminders.

**Reasons:**
- iPhone requires the app to be added to the Home Screen to receive push notifications; this is a documented limitation of iOS Safari and acceptable for a dedicated health app.
- A native app would require App Store submission and review. A PWA avoids that entirely while still being installable.
- VAPID credentials are stored server-side; push subscriptions are stored in Supabase.

**Trade-offs:**
- iOS push support requires iOS 16.4+ and the app to be installed via "Add to Home Screen."
- The user must manually enable notifications once; the Settings page explains the required steps.

---

### 5. Garden witch visual theme with accessibility-first sizing

**Decision:** Use a custom "garden witch" aesthetic (botanical decorations, earthy palette, wobbly borders) with accessibility as the primary design constraint.

**Reasons:**
- The target user has cataracts. All body text is 1rem minimum; headings use large Cormorant Garamond (1.6rem for h2, larger for h1); tap targets are minimum 48px × 48px; pain scale uses large emoji faces.
- The theme is a deliberate creative choice that makes the app feel personal and calming rather than clinical.
- Botanical PNG corner decorations are layered outside `overflow: hidden` card containers using a transparent wrapper div technique so they visually sit on card corners without being clipped.

**Font stack:**
- Cormorant Garamond — h1, h2 headings (large, readable serif)
- Crete Round — h3, card labels
- Inter — body text

**Trade-offs:**
- The wobbly border-radius (`15px 225px 15px 255px / 255px 15px 225px 15px`) requires careful use of `overflow: hidden` on exercise cards, which in turn requires the corner decoration wrapper technique.

---

### 6. Routine level selector via localStorage

**Decision:** Store the user's routine level preference (`starter` / `building` / `full`) in `localStorage` under `pt_routine_level`, managed by `lib/routine.ts`.

**Reasons:**
- The preference is device-local and session-persistent; it doesn't need to survive device changes.
- Avoiding a database round-trip for a UI preference keeps the Today page fast.
- `readRoutineLevel()` and `writeRoutineLevel()` in `lib/routine.ts` centralize all localStorage access and handle SSR (no-window) safely.

**Trade-offs:**
- If the user clears browser storage or switches devices, the preference resets to `starter`. Acceptable for the use case.

---

### 7. Exercise animations as inline SVG via Framer Motion

**Decision:** All exercise demonstration animations are React components using SVG + Framer Motion rather than GIFs or video.

**Reasons:**
- SVG animations are vector, accessible, and load instantly with no network request.
- Framer Motion provides smooth, looping animations with minimal boilerplate.
- Each animation is tailored to the specific exercise movement (heel slides, quad sets, etc.) using a stick figure representation.

**Trade-offs:**
- Each exercise requires a custom SVG component; this is hand-authoring work but gives full control over the visual and the motion path.
- YouTube video links are also provided as a fallback for users who want to see a real-person demonstration.
