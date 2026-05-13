# Landing Page Tech Stack — Replication Blueprint

Izolirani tehnički blueprint korišten za `pinka.finance` landing. Cilj: replicirati identičan stack za drugi projekt sa zasebnim contentom. Sve odluke i konfiguracije su provjerene u kodu — kopiraj strukturu, zamijeni copy/branding.

---

## 1. Core stack (verzije fiksne)

| Sloj | Tehnologija | Verzija |
|------|-------------|---------|
| Framework | Next.js (App Router) | `^14.2.35` |
| Jezik | TypeScript (strict, `noUncheckedIndexedAccess`) | `^5.6.3` |
| Runtime | Node.js | `>=20` (vidi `.nvmrc`) |
| UI runtime | React + ReactDOM | `^18.3.1` |
| Styling | Tailwind CSS | `^3.4.14` |
| Tailwind plugin | `tailwindcss-animate` | `^1.0.7` |
| Animations | Framer Motion | `^11.11.10` |
| Icons | `lucide-react` | `^0.460.0` |
| Primitives (a11y) | Radix UI (`accordion`, `checkbox`, `dialog`, `label`, `radio-group`, `select`, `slot`) | `^1.x / ^2.x` |
| Variant API | `class-variance-authority` + `clsx` + `tailwind-merge` | `^0.7 / ^2.1 / ^2.5` |
| Forms | `react-hook-form` + `@hookform/resolvers` | `^7.53 / ^3.9` |
| Validation | `zod` (shared client+server) | `^3.23` |
| ORM | Prisma + `@prisma/client` | `^5.22` |
| DB | PostgreSQL 16 (Alpine) | u Dockeru / Neon / Supabase |
| Transactional email | `resend` | `^4.0` |
| Build/lint | `eslint`, `eslint-config-next` | `^8.57 / ^14.2` |
| Deploy A | Vercel (region `fra1`) | — |
| Deploy B | Docker (multi-stage, multi-arch) → Coolify / Dokploy / plain compose | — |

NPM scripts (`package.json`):
```json
{
  "dev": "next dev",
  "build": "prisma generate && next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "db:push": "prisma db push",
  "db:studio": "prisma studio",
  "postinstall": "prisma generate"
}
```

---

## 2. Project layout

```
app/
  api/
    waitlist/route.ts         # segmented signup (POST, runtime=nodejs, force-dynamic)
    newsletter/route.ts       # footer email capture
  privacy/page.tsx
  terms/page.tsx
  globals.css                 # @tailwind + custom @layer base & components
  layout.tsx                  # fonts, Metadata, Viewport, JSON-LD, MotionProvider
  page.tsx                    # composes sections
  icon.tsx                    # dynamic favicon (next/og style)
  opengraph-image.tsx         # runtime="edge", ImageResponse — 1200×630 PNG
  robots.ts                   # MetadataRoute.Robots
  sitemap.ts                  # MetadataRoute.Sitemap

components/
  sections/                   # 1 file per landing section
    navigation.tsx
    hero.tsx
    problem.tsx
    how-it-works.tsx
    built-on.tsx
    transparency.tsx
    roadmap.tsx
    team.tsx
    faq.tsx
    waitlist-section.tsx
    footer.tsx
  waitlist/
    waitlist-form.tsx         # react-hook-form + zodResolver, discriminated union by role
    waitlist-dialog.tsx       # Radix Dialog wrapper
  ui/                         # shadcn-style primitives over Radix
    accordion.tsx button.tsx checkbox.tsx dialog.tsx
    input.tsx label.tsx radio-group.tsx select.tsx textarea.tsx
  logo.tsx
  motion-provider.tsx         # <MotionConfig reducedMotion="user">
  section-reveal.tsx          # scroll-reveal wrapper around motion.div
  phone-mockup.tsx            # animated hero device

lib/
  db.ts                       # PrismaClient singleton (globalThis pattern)
  email.ts                    # Resend wrapper + HTML template + dev stdout fallback
  waitlist-schema.ts          # zod discriminatedUnion(role) — shared client+server
  utils.ts                    # cn() = twMerge(clsx(...))

prisma/
  schema.prisma               # Postgres + binaryTargets za Alpine + ARM64

docker/
  entrypoint.sh               # prisma db push --skip-generate, then node server.js

Dockerfile                    # multi-stage: base → deps → builder → runner
docker-compose.yml            # postgres + web, healthchecks
vercel.json                   # framework: nextjs, regions: ["fra1"]
next.config.mjs               # output: "standalone", headers(), optimizePackageImports
tailwind.config.ts            # full design tokens (boje, fontovi, shadows, animacije)
postcss.config.mjs            # tailwindcss + autoprefixer
tsconfig.json                 # strict + bundler resolution + "@/*" alias
.env.example                  # sve env varijable s komentarima
.nvmrc                        # 20
```

---

## 3. Next.js konfiguracija (`next.config.mjs`)

```js
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: "standalone",                          // za slim Docker image (server.js bundle)
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-DNS-Prefetch-Control", value: "on" },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
      ],
    }];
  },
};
```

`tsconfig.json` ključne opcije:
- `"strict": true`, `"noUncheckedIndexedAccess": true`
- `"moduleResolution": "bundler"`, `"module": "esnext"`, `"target": "ES2022"`
- alias `"@/*": ["./*"]`

---

## 4. Tailwind design system (`tailwind.config.ts`)

Pattern: **proširi default theme custom tokenima**, ne mijenjaj defaulte.

- `darkMode: ["class"]` (light-only u praksi, ali pripremljeno)
- `content`: samo `./app/**/*.{ts,tsx}` i `./components/**/*.{ts,tsx}`
- Container centrirani, responsive padding (1.25rem → 4rem), max `2xl: 1280px`
- Extended opacities (3/4/6/8/12/15/18/85) za fino podešavanje borders/backgrounds
- Custom palete: `cream / sand / sandDeep / ink / inkSoft / inkMuted`, brand `coral` (10 nijansi), `teal` (10 nijansi), `forest`, `rust`, `border` (rgba), `ring`
- **Fluid typography**: `display-xl/lg/md` koriste `clamp()` umjesto media queriesa
- Custom fontovi mapirani na CSS varijable: `var(--font-sans)`, `var(--font-display)`
- `maxWidth: { content: "1200px", hero: "1280px" }`
- Radii `lg:16 md:12 sm:8`
- Custom shadows: `soft / lift / coral` (brand-glow)
- Keyframes: `accordion-down/up` (vezano za Radix CSS var `--radix-accordion-content-height`), `fade-in`
- Plugin: `tailwindcss-animate`

Globalni CSS (`app/globals.css`) dodaje:
- `@layer base`: font-smoothing, `text-rendering: optimizeLegibility`, `scroll-behavior: smooth`, `prefers-reduced-motion` override, `::selection` boja, default heading/paragraph stilovi, `.form-error`
- `@layer components`: `.container-content`, `.container-hero`, `.section-padding`, `.eyebrow`, `.card-base`, `.gradient-text`, `.grain` (SVG-noise overlay inline), `.focus-ring`

---

## 5. Fontovi & SEO (`app/layout.tsx`)

```tsx
import { Inter, Fraunces } from "next/font/google";
const inter = Inter({ subsets: ["latin","latin-ext"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin","latin-ext"], variable: "--font-display",
                            display: "swap", axes: ["opsz","SOFT"] });
```
Klase `${inter.variable} ${fraunces.variable}` idu na `<html>`.

**Metadata API** — sve preko Next.js `Metadata` i `Viewport` exporta:
- `metadataBase` iz `NEXT_PUBLIC_SITE_URL`
- `title` template (`"%s · brand"`)
- `keywords`, `authors`, `creator`
- `openGraph` s referencom na `/opengraph-image` (1200×630)
- `twitter` `summary_large_image`
- `robots.googleBot.max-image-preview: "large"`
- `icons.icon: "/icon"` (dinamični kroz `app/icon.tsx`)
- `alternates.canonical`

**Viewport**: locked `maximumScale=1, userScalable=false` (svjesni a11y trade-off; iOS ignorira), `themeColor: "#FBF8F3"`, `colorScheme: "light"`.

**Skip-link** za keyboard navigaciju kao prvi child `<body>`.

**JSON-LD `Organization`** ubačen kroz `<script type="application/ld+json">` u root layoutu.

**Dynamic OG image** (`app/opengraph-image.tsx`) — `runtime = "edge"`, koristi `ImageResponse` iz `next/og`, čisti CSS-in-style, gradijent + circle blobs + brand wordmark + headline.

**`robots.ts` i `sitemap.ts`** koriste `MetadataRoute` tipove (file-based routing).

---

## 6. Motion sustav

```tsx
// components/motion-provider.tsx
<MotionConfig reducedMotion="user">{children}</MotionConfig>
```
Globalno poštuje `prefers-reduced-motion` — nema potrebe za `useReducedMotion` po komponenti.

```tsx
// components/section-reveal.tsx — reusable scroll-reveal wrapper
<motion.div
  initial={{ opacity: 0, y: 18 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
  viewport={{ once: true, margin: "-80px 0px -40px 0px" }}
/>
```
Renderira isti `motion.div` na serveru i klijentu (bez hydration mismatcha).

---

## 7. UI primitive pattern (shadcn-style)

Svaki UI primitive je tanki wrapper preko Radix + `cva` za varijante + `cn()` za merge.

```tsx
// components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full ...",
  {
    variants: {
      variant: { primary: "...", secondary: "...", outline: "...", ghost: "...", link: "..." },
      size:    { default: "h-12 px-6", sm: "h-10 px-4 text-sm", lg: "h-14 px-8 text-lg", icon: "h-11 w-11" },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);
// asChild via Radix Slot
```

`lib/utils.ts`:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

---

## 8. Forms (React Hook Form + Zod)

**Shared schema** (`lib/waitlist-schema.ts`) — koristi se i na klijentu (validacija prije submita) i na serveru (re-parse u API ruti):
```ts
export const waitlistSchema = z.discriminatedUnion("role", [
  donorSchema, creatorSchema, investorSchema, mediaSchema,
]);
```

Klijent (`components/waitlist/waitlist-form.tsx`):
```ts
const form = useForm<WaitlistInput>({ resolver: zodResolver(waitlistSchema), ... });
```

Server (`app/api/waitlist/route.ts`):
- `runtime = "nodejs"`, `dynamic = "force-dynamic"`
- `safeParse` payload → 400 s prvom porukom iz `error.issues`
- `prisma.waitlistSignup.upsert({ where: { email }, create, update })` (idempotent na re-submit)
- IP hashing: `sha256(req.headers["x-forwarded-for"].split(",")[0]).slice(0,32)` — pohrani hash, ne raw IP
- UA cap na 1000 chars
- Confirmation email best-effort (try/catch — ne ruši request ako Resend padne)
- Optional admin notify preko `WAITLIST_NOTIFY_EMAIL`

---

## 9. Database (Prisma + Postgres)

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = [
    "native",
    "linux-musl-arm64-openssl-3.0.x",   // Alpine ARM64 (Oracle Ampere, ARM Coolify)
    "linux-musl-openssl-3.0.x"          // Alpine x86_64
  ]
}
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }
```

`lib/db.ts` — **PrismaClient singleton** preko `globalThis` (sprječava connection pool leak u dev hot-reloadu):
```ts
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["warn","error"] : ["error"],
});
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

Schema strategija: **lagana auditing polja** (`ipHash`, `userAgent`, `source`, `createdAt`) + role-specific opcionalna polja u istoj tablici (nullable). Indexi na `role` i `createdAt`.

---

## 10. Transactional email (Resend)

```ts
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
```
**Dev fallback**: ako `RESEND_API_KEY` nije postavljen, `sendEmail` samo logira u stdout (`console.info`) i vrati `{ skipped: true }`. Nema dev-time ovisnosti o external service-u.

HTML template je inline-styled string (jer email klijenti ne podržavaju moderne CSS-e). `escapeHtml` helper za bilo kakav user-supplied input.

---

## 11. Deploy A — Vercel

`vercel.json`:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "regions": ["fra1"],
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "github": { "silent": false }
}
```
Env vars (UI): `DATABASE_URL`, `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_SITE_URL`, optional `WAITLIST_NOTIFY_EMAIL`.

DB: Vercel Postgres / Neon / Supabase — `DATABASE_URL` connection string.

---

## 12. Deploy B — Docker (Coolify / Dokploy / compose)

**`Dockerfile`** (multi-stage):
1. `base` (node:20-alpine + libc6-compat + openssl) — apk metadata cached
2. `deps` — `npm ci --include=dev` s buildkit cache mountom (`/root/.npm`)
3. `builder` — `npm run build` (= `prisma generate && next build`)
4. `runner` — non-root `nextjs:1001`, kopira:
   - `.next/standalone` (server.js bundle)
   - `.next/static`
   - `public`
   - **eksplicitno** Prisma engine + CLI iz `node_modules/.prisma`, `@prisma/client`, `@prisma/engines`, `prisma` + `prisma/` direktorij (nft tracer ne pokupi sve)
   - `docker/entrypoint.sh`

**Container HEALTHCHECK** — `node -e "require('http').get(...)" ` na `:3000/`.

**`docker/entrypoint.sh`**:
```sh
set -e
[ -z "$DATABASE_URL" ] && { echo FATAL; exit 1; }
node ./node_modules/prisma/build/index.js db push --skip-generate
exec node server.js
```
Idempotentan boot: schema sync na svakom startu, onda standalone server.

**`docker-compose.yml`** — dva servicea (`postgres:16-alpine` + `web`), Postgres healthcheck (`pg_isready`), `depends_on: condition: service_healthy`, named volume `pinka_pg_data`, `POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?required}` (fail-fast ako varijabla nije postavljena).

**Coolify flow**: New Resource → Public Repository → auto-detect compose → pick `web` service → set env vars u UI → bind domain → Coolify provisiona Let's Encrypt cert kroz bundled Traefik.

---

## 13. Env vars (`.env.example` template)

```env
# Public site config
NEXT_PUBLIC_SITE_URL="https://your-domain.tld"

# Database (Postgres)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dbname?schema=public"

# Resend transactional email (leave blank in dev → logs to stdout)
RESEND_API_KEY=""
RESEND_FROM="brand <hello@your-domain.tld>"

# Optional: server admin notification
WAITLIST_NOTIFY_EMAIL=""

# Self-host only (used by docker-compose)
POSTGRES_PASSWORD=""        # openssl rand -base64 32
```

---

## 14. A11y & UX defaults

- Skip-link kao prvi `<body>` child
- `<html lang="hr">` (ili koji god jezik) — postavi eksplicitno
- `focus-visible:ring-2 ring-ring ring-offset-2` standardno na interaktivnima
- `prefers-reduced-motion` poštovan globalno (CSS + Framer)
- Radix primitives daju keyboard nav + ARIA out-of-the-box
- Form errors: `.form-error` klasa, `aria-invalid` preko `react-hook-form` state-a
- `::selection` brand-color (subtle)

---

## 15. Replication checklist — što mijenjaš kad kreiraš novi projekt

1. **`package.json`**: `name`, `description`
2. **`README.md`**, **`LICENSE`**, **`SECURITY.md`**, **`CONTRIBUTING.md`**, **`CODE_OF_CONDUCT.md`**
3. **Brand palette** u `tailwind.config.ts` — zamijeni `coral`, `teal`, `forest`, `rust` i neutralne `cream/sand/ink*` svojima
4. **Fontovi** u `app/layout.tsx` — `Inter` + `Fraunces` (sans + display serif) ili tvoj izbor (drži `var(--font-sans)` / `var(--font-display)` API)
5. **Metadata** u `app/layout.tsx` — `title`, `description`, `keywords`, `locale`, JSON-LD `Organization`
6. **OG image** u `app/opengraph-image.tsx` — copy, gradient stops, brand wordmark
7. **Sections** u `components/sections/*.tsx` — copy & layout per sekcija; struktura ostaje (`Hero`, `Problem`, `HowItWorks`, `BuiltOn`, `Transparency`, `Roadmap`, `Team`, `FAQ`, `WaitlistSection`, `Footer`) ili svoj set
8. **Schema** u `prisma/schema.prisma` — preimenuj model (`WaitlistSignup` → svoj), prilagodi role enum i polja
9. **Zod schema** u `lib/waitlist-schema.ts` — uskladi s Prisma modelom (zadrži `discriminatedUnion` pattern ako imaš više role-ova)
10. **API rute** — error poruke na svoj jezik
11. **Email template** u `lib/email.ts` — copy, boje, signature
12. **Env vars** — kopiraj `.env.example`, generiraj jaku `POSTGRES_PASSWORD` (`openssl rand -base64 32`)
13. **Vercel region** u `vercel.json` ako nisi u EU
14. **Domain** binding u Vercelu ili Coolify-u
15. **`docker-compose.yml`** — prefiksi (`pinka_pg_data` → `tvoj_pg_data`), Postgres user/db ime

Ne mijenjaš: `Dockerfile`, `entrypoint.sh`, `next.config.mjs` headers, `tsconfig.json`, `postcss.config.mjs`, `lib/db.ts`, `lib/utils.ts`, `components/motion-provider.tsx`, `components/section-reveal.tsx`, `components/ui/*` primitives.

---

## 16. Bootstrap commands za novi projekt

```bash
# 1. Skeniraj postojeći repo kao starting point
git clone <new-repo> && cd <new-repo>

# 2. Kopiraj configs/structure iz pinka-finance/landing
cp -r ../pinka-finance/landing/{app,components,lib,prisma,docker,public} .
cp ../pinka-finance/landing/{Dockerfile,docker-compose.yml,vercel.json,next.config.mjs} .
cp ../pinka-finance/landing/{tailwind.config.ts,tsconfig.json,postcss.config.mjs} .
cp ../pinka-finance/landing/{package.json,.env.example,.gitignore,.nvmrc} .

# 3. Reset npm state, install
rm -rf node_modules package-lock.json
npm install

# 4. Configure env
cp .env.example .env   # popuni DATABASE_URL

# 5. DB up
npm run db:push

# 6. Run
npm run dev            # http://localhost:3000
npm run typecheck      # tsc --noEmit
npm run lint
```

---

## 17. Pre-launch quality gates

Prije prvog merge-a na main:
- `npm run typecheck` → 0 errors (strict mode)
- `npm run lint` → 0 warnings
- `npm run build` → produces `.next/standalone`
- `docker compose up --build` → web zdrav na `:3000`, healthcheck zelen
- `prefers-reduced-motion: reduce` testirati ručno (DevTools → Rendering → Emulate CSS media)
- Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, SEO = 100
- OG image preview: opengraph.xyz ili `https://your-domain.tld/opengraph-image`
- `robots.txt` i `sitemap.xml` accessible
- Privacy + Terms stranice prisutne i linkane iz footera

---

*Last reviewed against: `pinka-finance/landing` @ commit `f0c5440`. Stack je intencionalno konzervativan — sve glavne tech izbore (Next 14 App Router, Prisma + Postgres, Radix + Tailwind, Framer Motion, Resend) možeš držati godinama bez breaking migracija.*
