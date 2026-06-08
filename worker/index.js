/**
 * Cloudflare Worker for the pinka.finance landing.
 *
 * Serves the static Next.js export (./out, via the ASSETS binding) and handles
 * the two dynamic form endpoints that used to be Next API routes:
 *   POST /api/waitlist    — stores a waitlist signup in D1 (binding: DB)
 *   POST /api/newsletter  — stores a newsletter signup in D1
 *
 * Static assets are served directly by the platform (the Worker is only invoked
 * for non-asset paths), so security headers for assets live in ./public/_headers.
 * Optional Resend integration: set RESEND_API_KEY (+ RESEND_FROM, WAITLIST_NOTIFY_EMAIL).
 */

const ROLES = ["donor", "creator", "investor", "media"];
const ORG_TYPES = ["kreator", "neprofit", "firma", "drugo"];
const INVEST_TYPES = ["pre-seed", "seed", "partnership", "advisory"];

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const isEmail = (v) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) && v.length <= 320;

const str = (v, max) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

async function hashIp(ip) {
  if (!ip) return null;
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

function clientIp(req) {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null
  );
}

async function readJson(req) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

function validateWaitlist(data) {
  if (!data || typeof data !== "object") return { error: "Neispravan JSON." };
  if (!isEmail(data.email)) return { error: "Unesi ispravan email." };
  if (!ROLES.includes(data.role)) return { error: "Odaberi jednu opciju." };

  const details = {};
  if (data.role === "creator") {
    if (!str(data.orgName, 160)) return { error: "Naziv je obavezan." };
    if (!str(data.link, 300)) return { error: "Web ili poveznica je obavezna." };
    if (!ORG_TYPES.includes(data.orgType)) return { error: "Odaberi vrstu." };
    details.orgName = str(data.orgName, 160);
    details.link = str(data.link, 300);
    details.audienceSize = str(data.audienceSize, 120);
    details.orgType = data.orgType;
  } else if (data.role === "investor") {
    if (!str(data.fundName, 160)) return { error: "Naziv je obavezan." };
    if (!str(data.fundLink, 300)) return { error: "Web je obavezan." };
    const types = Array.isArray(data.investTypes)
      ? data.investTypes.filter((t) => INVEST_TYPES.includes(t))
      : [];
    if (!types.length) return { error: "Odaberi barem jednu opciju." };
    details.fundName = str(data.fundName, 160);
    details.fundLink = str(data.fundLink, 300);
    details.investTypes = types;
  } else if (data.role === "media") {
    if (!str(data.publication, 160)) return { error: "Naziv publikacije je obavezan." };
    details.publication = str(data.publication, 160);
    details.coverageType = str(data.coverageType, 500);
  } else {
    // donor
    details.interests = str(data.interests, 500);
  }

  return {
    value: {
      email: data.email.trim().toLowerCase(),
      name: str(data.name, 120),
      role: data.role,
      source: ["primary", "footer", "modal"].includes(data.source) ? data.source : null,
      details: JSON.stringify(details),
    },
  };
}

async function sendEmail(env, { to, subject, html }) {
  if (!env.RESEND_API_KEY) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM || "pinka <hello@pinka.finance>",
        to,
        subject,
        html,
      }),
    });
  } catch (e) {
    console.error("[email] send failed", e);
  }
}

function confirmationEmail(name) {
  const greeting = name ? `Bok, ${name}!` : "Bok!";
  return `<!doctype html><html lang="hr"><body style="margin:0;padding:0;background:#FBF8F3;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Inter,sans-serif;color:#1A1A1A;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
    <div style="font-family:Georgia,serif;font-size:28px;letter-spacing:-0.01em;color:#E85D5D;margin-bottom:8px;">pinka</div>
    <h1 style="font-family:Georgia,serif;font-size:28px;line-height:1.2;margin:24px 0 8px;">${greeting}</h1>
    <p style="font-size:16px;line-height:1.6;color:#3A3A3A;margin:0 0 16px;">Hvala što si se pridružio listi čekanja. Zabilježili smo te i javit ćemo se čim budemo spremni za prve pilot korisnike.</p>
    <p style="font-size:16px;line-height:1.6;color:#3A3A3A;margin:0 0 16px;">Pinka je onchain platforma za grupno financiranje — spaja SEPA Instant i Monerium EURe pa podržavatelji uplate skenom, a kreatori, udruge i timovi primaju sredstva izravno, bez kartičnih provizija i bez čekanja.</p>
    <p style="font-size:16px;line-height:1.6;color:#3A3A3A;margin:0 0 24px;">U međuvremenu, ako imaš pitanja ili ideje, samo odgovori na ovaj e-mail.</p>
    <hr style="border:none;border-top:1px solid rgba(26,26,26,0.12);margin:32px 0;" />
    <p style="font-size:13px;line-height:1.5;color:#6B6B6B;margin:0;">pinka.finance · Made in Croatia 🇭🇷</p>
  </div></body></html>`;
}

const escapeHtml = (v) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function handleWaitlist(req, env) {
  const body = await readJson(req);
  const { value, error } = validateWaitlist(body);
  if (error) return json({ ok: false, error }, 400);

  const ipHash = await hashIp(clientIp(req));
  const userAgent = req.headers.get("user-agent")?.slice(0, 1000) || null;

  try {
    await env.DB.prepare(
      `INSERT INTO waitlist_signups (email, name, role, source, details, ip_hash, user_agent, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(email) DO UPDATE SET
         name=excluded.name, role=excluded.role, source=excluded.source,
         details=excluded.details, ip_hash=excluded.ip_hash,
         user_agent=excluded.user_agent, updated_at=datetime('now')`
    )
      .bind(value.email, value.name, value.role, value.source, value.details, ipHash, userAgent)
      .run();
  } catch (e) {
    console.error("[waitlist] d1 error", e);
    return json({ ok: false, error: "Trenutno ne možemo spremiti prijavu. Pokušaj ponovno za par minuta." }, 500);
  }

  // Best-effort emails — never fail the request on email errors.
  await sendEmail(env, {
    to: value.email,
    subject: "Hvala — pridružio si se pinka listi čekanja",
    html: confirmationEmail(value.name ? escapeHtml(value.name) : null),
  });
  if (env.WAITLIST_NOTIFY_EMAIL) {
    await sendEmail(env, {
      to: env.WAITLIST_NOTIFY_EMAIL,
      subject: `[pinka] ${value.role}: ${value.email}`,
      html: `<pre style="font-family:ui-monospace,monospace;font-size:12px">${escapeHtml(
        JSON.stringify(value, null, 2)
      )}</pre>`,
    });
  }

  return json({ ok: true });
}

async function handleNewsletter(req, env) {
  const body = await readJson(req);
  if (!body || !isEmail(body.email)) return json({ ok: false, error: "Unesi ispravan email." }, 400);
  const email = body.email.trim().toLowerCase();
  const ipHash = await hashIp(clientIp(req));
  try {
    await env.DB.prepare(
      `INSERT INTO newsletter_signups (email, ip_hash) VALUES (?, ?)
       ON CONFLICT(email) DO NOTHING`
    )
      .bind(email, ipHash)
      .run();
  } catch (e) {
    console.error("[newsletter] d1 error", e);
    return json({ ok: false, error: "Pokušaj ponovno." }, 500);
  }
  return json({ ok: true });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);

    if (url.pathname === "/api/waitlist") {
      if (req.method !== "POST") return json({ ok: false, error: "Method not allowed." }, 405);
      return handleWaitlist(req, env);
    }
    if (url.pathname === "/api/newsletter") {
      if (req.method !== "POST") return json({ ok: false, error: "Method not allowed." }, 405);
      return handleNewsletter(req, env);
    }

    // Everything else: static assets (Next export). With Workers Assets the
    // platform serves matching assets without invoking this Worker; this is a
    // safety fallback for any request routed here.
    return env.ASSETS.fetch(req);
  },
};
