import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";
import { sendEmail, waitlistConfirmationEmail } from "@/lib/email";
import { waitlistSchema } from "@/lib/waitlist-schema";

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

  const parsed = waitlistSchema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      {
        ok: false,
        error: first?.message ?? "Provjeri unesene podatke.",
      },
      { status: 400 }
    );
  }
  const data = parsed.data;
  const ipHash = hashIp(clientIp(req));
  const userAgent = req.headers.get("user-agent")?.slice(0, 1000) ?? null;

  const baseRecord = {
    email: data.email.toLowerCase(),
    name: data.name?.trim() ? data.name.trim() : null,
    role: data.role,
    source: data.source ?? null,
    ipHash,
    userAgent,
  };

  const roleSpecific =
    data.role === "donor"
      ? { podcasts: emptyToNull(data.podcasts) }
      : data.role === "creator"
      ? {
          orgName: data.orgName,
          link: data.link,
          audienceSize: emptyToNull(data.audienceSize),
          orgType: data.orgType,
        }
      : data.role === "investor"
      ? {
          fundName: data.fundName,
          fundLink: data.fundLink,
          investTypes: data.investTypes.join(","),
        }
      : {
          publication: data.publication,
          coverageType: emptyToNull(data.coverageType),
        };

  try {
    await prisma.waitlistSignup.upsert({
      where: { email: baseRecord.email },
      create: { ...baseRecord, ...roleSpecific },
      update: { ...baseRecord, ...roleSpecific },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("[waitlist] prisma error", e.code, e.message);
      return NextResponse.json(
        { ok: false, error: "Trenutno ne mozemo spremiti prijavu. Pokušaj ponovno za par minuta." },
        { status: 500 }
      );
    }
    console.error("[waitlist] unexpected", e);
    return NextResponse.json(
      { ok: false, error: "Nešto je pošlo po krivu." },
      { status: 500 }
    );
  }

  // Best-effort confirmation email — don't fail the whole request on email errors.
  try {
    await sendEmail({
      to: baseRecord.email,
      subject: "Hvala — pridružio si se pinka waitlist-u",
      html: waitlistConfirmationEmail(baseRecord.name),
    });

    const notify = process.env.WAITLIST_NOTIFY_EMAIL;
    if (notify) {
      await sendEmail({
        to: notify,
        subject: `[pinka waitlist] ${baseRecord.role}: ${baseRecord.email}`,
        html: `<pre style="font-family:ui-monospace,monospace;font-size:12px">${escapeHtml(
          JSON.stringify({ ...baseRecord, ...roleSpecific }, null, 2)
        )}</pre>`,
      });
    }
  } catch (e) {
    console.error("[waitlist] email send failed", e);
  }

  return NextResponse.json({ ok: true });
}

function emptyToNull(value: string | undefined | null) {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
