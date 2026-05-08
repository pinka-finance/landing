import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.RESEND_FROM ?? "pinka <hello@pinka.finance>";

const resend = apiKey ? new Resend(apiKey) : null;

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  if (!resend) {
    console.info("[email] RESEND_API_KEY not set — would have sent:", {
      to,
      subject,
    });
    return { id: "dev-mode", skipped: true };
  }
  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to,
    subject,
    html,
    replyTo,
  });
  if (error) {
    console.error("[email] Resend error", error);
    throw new Error(error.message);
  }
  return { id: data?.id ?? "unknown", skipped: false };
}

export function waitlistConfirmationEmail(name: string | null | undefined) {
  const greeting = name ? `Bok, ${escapeHtml(name)}!` : "Bok!";
  return /* html */ `
    <!doctype html>
    <html lang="hr">
      <body style="margin:0;padding:0;background:#FBF8F3;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Inter,sans-serif;color:#1A1A1A;">
        <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
          <div style="font-family:Georgia,serif;font-size:28px;letter-spacing:-0.01em;color:#E85D5D;margin-bottom:8px;">pinka</div>
          <h1 style="font-family:Georgia,serif;font-size:28px;line-height:1.2;margin:24px 0 8px;">${greeting}</h1>
          <p style="font-size:16px;line-height:1.6;color:#3A3A3A;margin:0 0 16px;">
            Hvala što si se pridružio waitlist-u. Zabilježili smo te i javit ćemo se čim budemo spremni za prve pilot korisnike.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#3A3A3A;margin:0 0 16px;">
            Pinka spaja SEPA Instant i Monerium EURe tako da donatori daju, a kreatori i organizacije primaju —
            bez kartičnih provizija, bez čekanja.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#3A3A3A;margin:0 0 24px;">
            U međuvremenu, ako imaš pitanja ili ideje, samo odgovori na ovaj mail.
          </p>
          <hr style="border:none;border-top:1px solid rgba(26,26,26,0.12);margin:32px 0;" />
          <p style="font-size:13px;line-height:1.5;color:#6B6B6B;margin:0;">
            pinka.finance · Made in Croatia 🇭🇷 · Članovi UBIK-a
          </p>
        </div>
      </body>
    </html>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
