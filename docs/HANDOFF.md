# pinka.finance landing — handoff / status

> Snapshot for picking work back up after a context reset. Last updated: 2026-06-02.

## What this repo is

Marketing **landing page** for **pinka.finance** — a Croatian **onchain group-funding / crowdfunding** platform (donacije, crowdfunding, ulaznice, soft tokenizacija, nekretnine) on the SEPA Instant → Monerium EURe → Gnosis/Safe rail. Pre-launch, waitlist-oriented. Croatian copy.

**Two separate properties** (don't confuse them):
- **pinka.finance** → this landing (this repo).
- **pinka.io** → the actual app (source: `/Users/ms/git/pinka-finance/app`), live. Any "open the app" link goes to https://pinka.io. (The app's own `.env` still says `app.pinka.finance`, which does NOT resolve — stale; the real deploy is pinka.io.)

## Architecture & hosting

- **Next.js 14 static export** (`output: "export"` → `./out`). No server, no Prisma/Postgres.
- **Cloudflare Workers + Static Assets**: `worker/index.js` serves `./out` and handles `POST /api/waitlist` + `/api/newsletter`, writing signups to **D1** (`pinka-landing`, schema in `d1/schema.sql`). Optional Resend email via `fetch`.
- Config: `wrangler.toml` (account **D.O.M.** `7dc7167b7e2e00923bfa7cd697df14e4`, D1 id `3064a3a4-4db1-48e9-a3bb-fb97dfa8a8d2`, route `pinka.finance/*`). Security headers + PNG MIME for `/icon` and `/opengraph-image` live in `public/_headers`.
- **Zone** `pinka.finance` (id `90c381d5f0be2537665fe301fbaaa012`) is in the D.O.M. Cloudflare account.

### Deploy / dev commands

```bash
export CLOUDFLARE_ACCOUNT_ID=7dc7167b7e2e00923bfa7cd697df14e4
npm run dev          # Next dev server (note: /api/* only exist in the Worker)
npm run build        # static export → ./out
npm run cf:deploy    # build + wrangler deploy (uploads ./out, binds D1, attaches route)
npm run cf:d1:init   # apply d1/schema.sql (one-time)
# local full stack incl. /api + local D1:
npx wrangler dev
```

## Done this cycle

- Repositioned all copy from podcast-donations → **general onchain crowdfunding**; Croatian grammar/spelling cleaned, anglicisms reduced. Sections, metadata, OG image, email, privacy/terms, waitlist roles/fields.
- Converted to **static export + Worker/D1**; removed Vercel/Docker/Prisma; README + `.env.example` rewritten.
- Deployed to `pinka.finance` via wrangler; **Cloudflare Access gate removed** (was gating the apex; resolved once the Worker route took over — site is public, HTTP 200).
- **Waitlist email wired**: `RESEND_API_KEY` set as a Worker secret; `pinka.finance` is a **verified Resend domain** (eu-west-1); confirmation mail sends from `hello@pinka.finance`. Verified end-to-end.
- **Waitlist modal**: wider on desktop, two-column landscape layout (single column on mobile); investor "Tip ulaganja" is a 2×2 grid.
- **Fixed site-wide horizontal scroll**: `body { overflow-x: clip }` (sticky-safe) + clipped the hero blobs.
- **Amateur football vertical** added (flagship GTM): `components/sections/football.tsx` (`#nogomet`), strategy brief `docs/pinka-x-nogomet.md`, roadmap pilot reframed to "5 nogometnih klubova", waitlist role "Klub / udruga / kreator", footer "Nogomet" link. Backed by the DOMOVINA dataset (901 clubs, 452 stadiums, 7.163 pitches — `klubovi.domovina.ai` / `gis.domovina.ai`).

## Open loops / what's missing / next steps

- [ ] **`WAITLIST_NOTIFY_EMAIL` not set** — no admin "new signup" ping. Set with `wrangler secret put WAITLIST_NOTIFY_EMAIL` if wanted.
- [ ] **`TECH_STACK.md` is stale** — still describes the old Vercel/Docker/Prisma standalone stack. Update to match the static-export + CF Worker/D1 reality, or delete.
- [ ] **App `.env` mismatch** — `/Users/ms/git/pinka-finance/app/.env(.example)` says `app.pinka.finance` but the app is deployed at **pinka.io**. Fix in the app repo (not this one).
- [ ] **Football GTM follow-through** (product, not landing): club onboarding flow in the app, link `gis.domovina.ai /klub/:slug` → pinka campaign, pilot outreach to the 222 full-contact clubs. See `docs/pinka-x-nogomet.md`.
- [ ] **Branch protection**: `main` requires PRs; pushes this cycle used a bypass (owner rights). Switch to PR flow if desired.
- [ ] **No analytics** by design (mentioned in privacy). Add opt-in + cookie banner before launch if needed.

## Known environment notes

- `wrangler` OAuth token (stepanic.matija@gmail.com) can deploy Workers/Pages/D1 and read zones, but **cannot edit DNS or Cloudflare Access** (no Zero Trust scope). For those: dashboard or a scoped API token.
- The chrome-devtools MCP couldn't attach during this work (browser profile locked by a running Chrome) — visual changes verified at the CSS/build level, not pixel screenshots. Worth a manual visual pass.

## Key files

```
app/page.tsx                     # section composition
components/sections/*.tsx        # hero, problem, how-it-works, football, built-on,
                                 # transparency, roadmap, team, faq, waitlist-section, footer
components/waitlist/*            # form (zod) + dialog
worker/index.js                  # CF Worker: assets + /api/* → D1
d1/schema.sql                    # waitlist_signups + newsletter_signups
wrangler.toml · public/_headers  # deploy config + headers
docs/pinka-x-nogomet.md          # football vertical strategy brief
docs/HANDOFF.md                  # this file
```
