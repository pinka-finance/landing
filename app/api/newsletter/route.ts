import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

import { prisma } from "@/lib/db";
import { newsletterSchema } from "@/lib/waitlist-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hashIp(ip: string | null) {
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() ?? null;
  return req.headers.get("x-real-ip");
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neispravan JSON." }, { status: 400 });
  }
  const parsed = newsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Provjeri email." },
      { status: 400 }
    );
  }
  try {
    await prisma.newsletterSignup.upsert({
      where: { email: parsed.data.email.toLowerCase() },
      create: {
        email: parsed.data.email.toLowerCase(),
        ipHash: hashIp(clientIp(req)),
      },
      update: {},
    });
  } catch (e) {
    console.error("[newsletter] error", e);
    return NextResponse.json(
      { ok: false, error: "Pokušaj ponovno." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
