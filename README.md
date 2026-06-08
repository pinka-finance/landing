# pinka.finance — landing

> Pre-launch landing page for **pinka.finance** — a Croatian onchain group-funding (crowdfunding) platform built on Monerium EURe, Safe and SEPA Instant.

[![Status: Pre-launch](https://img.shields.io/badge/status-pre--launch-orange)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Made in Croatia](https://img.shields.io/badge/made%20in-Croatia%20%F0%9F%87%AD%F0%9F%87%B7-red)](#)

## Domains — read this first

This repo is **only the marketing landing page**. There are two separate web properties:

| Domain | What | Source |
| --- | --- | --- |
| **pinka.finance** | Marketing **landing page** (this repo) | `pinka-finance/landing` |
| **pinka.io** | The actual **application** — public campaign pages + EPC/SEPA checkout | `pinka-finance/app` |

When the landing needs to link out to the live product, link to **https://pinka.io**.

## What is pinka?

pinka is a real-time, zero-fee **onchain crowdfunding / group-funding** platform. It is *not* podcast-specific — it supports several campaign types: donacije (donations), crowdfunding with a target goal, ulaznice (tickets), soft tokenizacija (on-chain attestation badges, not securities) and grupno financiranje nekretnina (real-estate).

Supporters pay by scanning a SEPA QR code in their banking app — funds settle in seconds via SEPA Instant and the Monerium-issued EURe stablecoin, into a per-campaign Safe multisig. Organizers withdraw on their own schedule, on-chain, with full transparency.

The platform sustains itself through optional supporter tips (Zeffy-style), not transaction fees on creators or causes.

## Built on

- **[Monerium](https://monerium.com)** — MiCA-licensed e-money institution issuing EURe
- **[Safe](https://safe.global)** — industry-standard multisig for treasury security
- **[Gnosis Chain](https://www.gnosis.io)** — EVM settlement layer optimized for EURe

## Status

🚧 **Pre-launch.** This repository hosts the landing page only. Public launch and pilot cohort target Q3 2026.

## Stack

- Next.js 14 (App Router), **static export** (`output: "export"`)
- TypeScript (strict mode)
- Tailwind CSS + Radix primitives
- Framer Motion
- **Cloudflare Workers + Static Assets** (hosting) with **D1** for waitlist/newsletter signups
- Optional [Resend](https://resend.com) for transactional email (called from the Worker via `fetch`)

There is no application server and no Postgres/Prisma — the site is fully static, and the only dynamic surface is the Worker in [`worker/index.js`](./worker/index.js).

## Local development

### Prerequisites

- Node.js 20+ (see [.nvmrc](./.nvmrc))
- (Optional) A [Resend](https://resend.com) API key for live confirmation emails.

### Run

```bash
npm install
npm run dev          # http://localhost:3000 (Next dev server)
npm run build        # static export → ./out
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

> Note: `npm run dev` runs the normal Next dev server, but the `/api/waitlist`
> and `/api/newsletter` endpoints only exist in the deployed Worker. To exercise
> them locally, run `npx wrangler dev` (serves `./out` + the Worker, with a local
> D1) after a `npm run build`.

### What's where

```
app/
  page.tsx            # composes all sections
  layout.tsx          # global metadata + fonts + JSON-LD
  opengraph-image.tsx # build-time OG image (next/og, static)
  icon.tsx            # build-time favicon
  robots.ts / sitemap.ts
  privacy / terms     # legal pages

components/
  sections/           # one file per landing section
  waitlist/           # segmented signup form + dialog
  ui/                 # shadcn-style primitives
  phone-mockup.tsx    # animated hero device (campaign QR demo)

lib/
  utils.ts            # cn() helper
  waitlist-schema.ts  # zod schemas (client-side validation)

worker/
  index.js            # Cloudflare Worker: serves ./out + /api/* → D1

d1/
  schema.sql          # waitlist_signups + newsletter_signups tables

public/
  _headers            # security headers + PNG MIME for /icon, /opengraph-image
```

## Deployment — Cloudflare (wrangler)

The landing is deployed as a **Worker with Static Assets** on the **pinka.finance** apex
(zone in the `D.O.M.` Cloudflare account). Config lives in [`wrangler.toml`](./wrangler.toml).

```bash
# Account that owns the pinka.finance zone:
export CLOUDFLARE_ACCOUNT_ID=7dc7167b7e2e00923bfa7cd697df14e4

# 1. (one time) create the D1 database, then put its id in wrangler.toml
wrangler d1 create pinka-landing

# 2. (one time) apply the schema
npm run cf:d1:init        # wrangler d1 execute pinka-landing --remote --file=./d1/schema.sql

# 3. build + deploy (uploads ./out as assets, binds D1, attaches the apex route)
npm run cf:deploy         # npm run build && wrangler deploy

# 4. (optional) transactional email via Resend
wrangler secret put RESEND_API_KEY
wrangler secret put WAITLIST_NOTIFY_EMAIL   # admin signup notifications
# and uncomment RESEND_FROM under [vars] in wrangler.toml
```

The Worker route `pinka.finance/*` attaches to the existing proxied DNS record for the apex.

> **Note on Cloudflare Access:** the apex was previously gated by a Cloudflare Access
> (Zero Trust) application. For the public landing this must be removed in the dashboard:
> *Zero Trust → Access → Applications → the app with domain `pinka.finance` → Delete*
> (or set its policy to *Bypass / Everyone*). It should not be active for this domain.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## Links

- 🌐 [pinka.finance](https://pinka.finance) — landing (this repo)
- 🚀 [pinka.io](https://pinka.io) — the app
- 🐙 [pinka-finance](https://github.com/pinka-finance) — GitHub organization
- 📧 [hello@pinka.finance](mailto:hello@pinka.finance) — general inquiries
- 🔒 [security@pinka.finance](mailto:security@pinka.finance) — security disclosures (see [SECURITY.md](./SECURITY.md))

## License

MIT — see [LICENSE](./LICENSE).
