"use client";

import { ArrowDown, ArrowUpRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/phone-mockup";
import { WaitlistDialog } from "@/components/waitlist/waitlist-dialog";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  // Same props on server + client; MotionProvider's reducedMotion="user"
  // collapses transitions to 0s for users with the OS opt-out.
  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="hero"
      className="relative overflow-x-clip pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 grain"
      aria-labelledby="hero-heading"
    >
      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-coral/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -left-32 h-[420px] w-[420px] rounded-full bg-teal/10 blur-[140px]"
      />

      <div className="container-hero relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center min-h-[calc(80vh-80px)] lg:min-h-[calc(100vh-120px)]">
          <div className="max-w-2xl">
            <motion.div {...fade(0)}>
              <span className="eyebrow">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-coral animate-pulse" aria-hidden />
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              {...fade(0.05)}
              className="mt-5 text-display-xl text-ink"
            >
              {t("hero.titleA")}{" "}
              <span className="gradient-text">{t("hero.titleHighlight")}</span>
              <br />
              {t("hero.titleB")}
            </motion.h1>

            <motion.p
              {...fade(0.15)}
              className="mt-6 text-lg sm:text-xl text-inkSoft max-w-xl leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              {...fade(0.25)}
              className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <WaitlistDialog source="primary">
                <Button size="lg" className="w-full sm:w-auto">
                  <Zap className="h-4 w-4" aria-hidden />
                  {t("hero.cta")}
                </Button>
              </WaitlistDialog>
              <a
                href="#how"
                className="inline-flex items-center justify-center gap-1.5 text-base font-medium text-inkSoft hover:text-ink transition-colors focus-ring rounded-md px-2 py-2"
              >
                {t("hero.how")}
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="https://pinka.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-base font-medium text-teal hover:text-teal-700 transition-colors focus-ring rounded-md px-2 py-2"
              >
                {t("nav.viewApp")}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>

            <motion.dl
              {...fade(0.35)}
              className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-md"
            >
              <Stat label={t("hero.statFee")} value="0%" />
              <Stat label={t("hero.statSpeed")} value="<10s" />
              <Stat label={t("hero.statCoverage")} value="EU/EEA" />
            </motion.dl>
          </div>

          <motion.div
            {...fade(0.2)}
            className="relative flex items-center justify-center"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-inkMuted">{label}</dt>
      <dd className="mt-1 font-display text-2xl sm:text-3xl text-ink">{value}</dd>
    </div>
  );
}
