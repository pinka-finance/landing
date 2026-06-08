"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Twitter, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { makeNewsletterSchema, type NewsletterInput } from "@/lib/waitlist-schema";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-ink text-cream/85">
      <div className="container-content py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <Logo variant="light" />
            <p className="mt-4 text-cream/70 leading-relaxed">{t("footer.tagline")}</p>
            <p className="mt-2 text-sm text-cream/55">{t("footer.poweredBy")}</p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterCol
              title={t("footer.colProduct")}
              links={[
                { label: t("footer.linkHow"), href: "#how" },
                { label: t("footer.linkPodcast"), href: "#podcast" },
                { label: t("footer.linkFootball"), href: "#nogomet" },
                { label: t("footer.linkTech"), href: "#built-on" },
                { label: t("footer.linkRoadmap"), href: "#roadmap" },
                { label: t("footer.linkFaq"), href: "#faq" },
              ]}
            />
            <FooterCol
              title={t("footer.colResources")}
              links={[
                { label: t("footer.linkPrivacy"), href: "/privacy" },
                { label: t("footer.linkTerms"), href: "/terms" },
                { label: t("footer.linkSecurity"), href: "https://github.com/pinka-finance" },
              ]}
            />
            <div>
              <p className="text-xs uppercase tracking-wider text-cream/55 font-medium">
                {t("footer.colConnect")}
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="https://twitter.com/pinka_finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cream/85 hover:text-cream transition-colors focus-ring rounded-sm"
                  >
                    <Twitter className="h-4 w-4" aria-hidden /> Twitter / X
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/pinka-finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cream/85 hover:text-cream transition-colors focus-ring rounded-sm"
                  >
                    <Github className="h-4 w-4" aria-hidden /> GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@pinka.finance"
                    className="inline-flex items-center gap-2 text-cream/85 hover:text-cream transition-colors focus-ring rounded-sm"
                  >
                    <Mail className="h-4 w-4" aria-hidden /> hello@pinka.finance
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/10 pt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-cream/55">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("footer.prelaunch")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-cream/55 font-medium">{title}</p>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-cream/85 hover:text-cream transition-colors focus-ring rounded-sm"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterForm() {
  const { t } = useI18n();
  const [state, setState] = useState<
    | { status: "idle" }
    | { status: "submitting" }
    | { status: "success" }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const form = useForm<NewsletterInput>({
    resolver: zodResolver(makeNewsletterSchema(t)),
    mode: "onTouched",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;
      if (!res.ok || !json?.ok) {
        setState({
          status: "error",
          message: (json && "error" in json && json.error) || t("footer.errorRetry"),
        });
        return;
      }
      setState({ status: "success" });
    } catch {
      setState({ status: "error", message: t("footer.errorNetwork") });
    }
  });

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-cream/20 bg-cream/[0.06] px-4 py-3 text-sm text-cream/90"
      >
        <CheckCircle2 className="h-4 w-4 text-forest" aria-hidden />
        {t("footer.newsletterSuccess")}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 max-w-md">
      <label htmlFor="newsletter-email" className="block text-xs uppercase tracking-wider text-cream/55 mb-2 font-medium">
        {t("footer.newsletter")}
      </label>
      <div className="flex gap-2">
        <Input
          id="newsletter-email"
          type="email"
          inputMode="email"
          placeholder={t("footer.emailPlaceholder")}
          autoComplete="email"
          invalid={!!form.formState.errors.email}
          className="bg-cream/[0.06] border-cream/15 text-cream placeholder:text-cream/40 focus:ring-cream/30 focus:border-cream/30"
          {...form.register("email")}
        />
        <Button type="submit" disabled={state.status === "submitting"} variant="primary" size="default">
          {state.status === "submitting" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            t("footer.subscribe")
          )}
        </Button>
      </div>
      {form.formState.errors.email && (
        <p className="mt-1.5 text-xs text-coral-300 flex items-center gap-1.5" role="alert">
          <AlertCircle className="h-3 w-3" aria-hidden />
          {form.formState.errors.email.message}
        </p>
      )}
      {state.status === "error" && (
        <p className="mt-1.5 text-xs text-coral-300 flex items-center gap-1.5" role="alert">
          <AlertCircle className="h-3 w-3" aria-hidden />
          {state.message}
        </p>
      )}
    </form>
  );
}
