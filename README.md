# pinka.finance

> Pre-launch landing page for **pinka.finance** — a Croatian podcast crowdfunding platform built on Monerium EURe and SEPA Instant.

[![Status: Pre-launch](https://img.shields.io/badge/status-pre--launch-orange)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Made in Croatia](https://img.shields.io/badge/made%20in-Croatia%20%F0%9F%87%AD%F0%9F%87%B7-red)](#)

## What is pinka?

pinka is a real-time, zero-fee donation platform for podcasts and the organizations behind them.

Listeners donate by scanning a QR code at checkout in their banking app — funds settle in seconds via SEPA Instant and the Monerium-issued EURe stablecoin. Recipient organizations claim their share on their own schedule, on-chain, with full transparency.

The platform sustains itself through optional donor tips (Zeffy-style), not transaction fees on creators or causes.

## Built on

- **[Monerium](https://monerium.com)** — MiCA-licensed e-money institution issuing EURe
- **[Safe](https://safe.global)** — Industry-standard multisig treasury security
- **[Gnosis Chain](https://www.gnosis.io)** — EVM settlement layer optimized for EURe

## Status

🚧 **Pre-launch.** This repository hosts the landing page only. Public launch and pilot cohort target Q3 2026.

## Stack

- Next.js 14+ (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Framer Motion
- Prisma + Postgres
- Resend (transactional email)
- Vercel (deployment)

## Local Development

### Prerequisites

- Node.js 20+ (see [.nvmrc](./.nvmrc))
- A PostgreSQL database — use a local instance or a free [Neon](https://neon.tech) / [Supabase](https://supabase.com) project. SQLite works only with a manual schema swap; we keep Postgres in both environments for prod parity.
- (Optional) A [Resend](https://resend.com) API key. Without one, confirmation emails are logged to stdout instead of sent.

### One-time setup

```bash
# 1. Copy env template and fill in DATABASE_URL (and RESEND_API_KEY if you have one)
cp .env.example .env

# 2. Install deps
npm install

# 3. Push the Prisma schema to your database
npm run db:push
```

### Run

```bash
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
npm run db:studio    # Prisma Studio at http://localhost:5555
```

### What's where

```
app/
  api/waitlist        # segmented signup endpoint
  api/newsletter      # footer email capture
  page.tsx            # composes all sections
  layout.tsx          # global metadata + fonts
  opengraph-image.tsx # dynamic OG image generator
  privacy / terms     # legal pages

components/
  sections/           # one file per landing section
  waitlist/           # form + dialog
  ui/                 # shadcn-style primitives
  phone-mockup.tsx    # animated hero device
  section-reveal.tsx  # scroll-reveal wrapper

lib/
  db.ts               # Prisma client singleton
  email.ts            # Resend wrapper + dev-mode logger
  waitlist-schema.ts  # zod schemas (shared client + server)

prisma/
  schema.prisma       # WaitlistSignup + NewsletterSignup
```

### Deployment options

#### Vercel

1. Connect the GitHub repo to a new Vercel project.
2. Set environment variables: `DATABASE_URL`, `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_SITE_URL`, optionally `WAITLIST_NOTIFY_EMAIL`.
3. Vercel auto-detects Next.js. The build runs `prisma generate && next build` (see [vercel.json](./vercel.json) — region pinned to `fra1`).
4. Add `pinka.finance` as the production domain. HTTPS and HSTS are enforced via [next.config.mjs](./next.config.mjs) headers.

#### Self-host with Docker (Coolify, Dokploy, plain `docker compose`)

The repo ships a multi-stage [`Dockerfile`](./Dockerfile) (Next.js standalone output, runs as non-root) and a [`docker-compose.yml`](./docker-compose.yml) with `web` + `postgres` services. Image is multi-arch — works on both x86_64 and ARM64 (Oracle Cloud Ampere, Raspberry Pi, Coolify on ARM hosts).

**Local smoke test:**

```bash
export POSTGRES_PASSWORD="$(openssl rand -base64 24)"
docker compose up --build      # http://localhost:3000
```

**Coolify:**

1. In your Coolify dashboard, *New Resource → Public Repository* and point it at this GitHub repo.
2. Coolify auto-detects `docker-compose.yml`. Pick the `web` service as the application.
3. Under *Environment Variables*, set:
   - `POSTGRES_PASSWORD` — generate a strong value (e.g. `openssl rand -base64 32`)
   - `RESEND_API_KEY` — your Resend production key
   - `RESEND_FROM` — `pinka <hello@pinka.finance>` (or your verified sender)
   - `NEXT_PUBLIC_SITE_URL` — `https://pinka.finance`
   - `WAITLIST_NOTIFY_EMAIL` — optional admin notification address
4. Bind the domain `pinka.finance` to the `web` service. Coolify provisions Let's Encrypt automatically via its bundled Traefik proxy.
5. Deploy. The container's entrypoint runs `prisma db push --skip-generate` on every boot to keep the schema in sync — idempotent, safe to re-run.

The Postgres volume `pinka_pg_data` is persisted by Coolify; back it up via Coolify's scheduled backup feature or `pg_dump`.

To migrate beyond simple additive schema changes, generate proper migrations locally with `npx prisma migrate dev --name <change>`, commit them under `prisma/migrations/`, and switch the entrypoint to `prisma migrate deploy`.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## Links

- 🌐 [pinka.finance](https://pinka.finance) — coming soon
- 🐙 [pinka-finance](https://github.com/pinka-finance) — GitHub organization
- 📧 [hello@pinka.finance](mailto:hello@pinka.finance) — general inquiries
- 🔒 [security@pinka.finance](mailto:security@pinka.finance) — security disclosures (see [SECURITY.md](./SECURITY.md))

## Community

We're members of [UBIK](https://ubik.hr) — Croatian Association for Blockchain and Cryptocurrencies.

## License

MIT — see [LICENSE](./LICENSE).
