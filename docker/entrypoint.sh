#!/bin/sh
# Pinka container entrypoint. Runs once at boot:
#   1. Sync Prisma schema (idempotent — no-op when DB matches).
#   2. Start the Next.js standalone server.
#
# DB sync is conservative: refuses destructive changes by default. For migrations
# beyond simple additive changes, switch to `prisma migrate deploy` once you start
# generating proper migration files (see prisma/migrations/).

set -e

if [ -z "$DATABASE_URL" ]; then
  echo "[pinka] FATAL: DATABASE_URL is not set."
  exit 1
fi

echo "[pinka] Syncing Prisma schema to database…"
node ./node_modules/prisma/build/index.js db push --skip-generate

echo "[pinka] Starting Next.js on ${HOSTNAME:-0.0.0.0}:${PORT:-3000}"
exec node server.js
