"use client";

import { useState } from "react";
import {
  QrCode,
  Banknote,
  CheckCircle2,
  Settings2,
  Share2,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type Step = { icon: LucideIcon; title: string; body: string };

type Tab = "supporter" | "creator";

export function HowItWorks() {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("supporter");

  const supporterSteps: Step[] = [
    { icon: QrCode, key: "scan" },
    { icon: Banknote, key: "confirm" },
    { icon: CheckCircle2, key: "settled" },
  ].map((s) => ({
    icon: s.icon,
    title: t(`how.supporter.${s.key}.title`),
    body: t(`how.supporter.${s.key}.body`),
  }));

  const creatorSteps: Step[] = [
    { icon: Settings2, key: "launch" },
    { icon: Share2, key: "share" },
    { icon: TrendingUp, key: "onchain" },
    { icon: Wallet, key: "withdraw" },
  ].map((s) => ({
    icon: s.icon,
    title: t(`how.creator.${s.key}.title`),
    body: t(`how.creator.${s.key}.body`),
  }));

  return (
    <section
      id="how"
      className="section-padding bg-cream"
      aria-labelledby="how-heading"
    >
      <div className="container-content">
        <SectionReveal className="max-w-3xl">
          <span className="eyebrow">{t("how.eyebrow")}</span>
          <h2 id="how-heading" className="mt-4 text-display-lg">
            {t("how.heading")}
          </h2>
          <p className="mt-5 text-lg text-inkSoft">{t("how.intro")}</p>
        </SectionReveal>

        {/* Mobile tabs */}
        <div className="md:hidden mt-10">
          <div
            role="tablist"
            aria-label={t("how.eyebrow")}
            className="grid grid-cols-2 gap-1 rounded-md bg-sand p-1 text-sm font-medium"
          >
            <TabButton active={tab === "supporter"} onClick={() => setTab("supporter")} controls="panel-supporter">
              {t("how.tabSupporter")}
            </TabButton>
            <TabButton active={tab === "creator"} onClick={() => setTab("creator")} controls="panel-creator">
              {t("how.tabCreator")}
            </TabButton>
          </div>
          <div className="mt-6">
            {tab === "supporter" ? (
              <Panel id="panel-supporter" labelledBy="tab-supporter">
                <StepsList steps={supporterSteps} accent="coral" />
              </Panel>
            ) : (
              <Panel id="panel-creator" labelledBy="tab-creator">
                <StepsList steps={creatorSteps} accent="teal" />
              </Panel>
            )}
          </div>
        </div>

        {/* Desktop two columns */}
        <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-10 mt-16">
          <Column
            title={t("how.supporterTitle")}
            subtitle={t("how.supporterSubtitle")}
            accent="coral"
            steps={supporterSteps}
          />
          <Column
            title={t("how.creatorTitle")}
            subtitle={t("how.creatorSubtitle")}
            accent="teal"
            steps={creatorSteps}
          />
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
  controls,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  controls: string;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      onClick={onClick}
      className={cn(
        "rounded-sm px-4 py-2.5 transition-all focus-ring",
        active ? "bg-cream text-ink shadow-soft" : "text-inkMuted hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

function Panel({
  id,
  labelledBy,
  children,
}: {
  id: string;
  labelledBy: string;
  children: React.ReactNode;
}) {
  return (
    <div role="tabpanel" id={id} aria-labelledby={labelledBy}>
      {children}
    </div>
  );
}

function Column({
  title,
  subtitle,
  accent,
  steps,
}: {
  title: string;
  subtitle: string;
  accent: "coral" | "teal";
  steps: Step[];
}) {
  return (
    <SectionReveal className="rounded-lg border border-ink/8 bg-white/60 p-6 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h3
          className={cn(
            "font-display text-2xl sm:text-3xl tracking-tight",
            accent === "coral" ? "text-coral" : "text-teal"
          )}
        >
          {title}
        </h3>
        <p className="mt-1 text-inkMuted text-sm">{subtitle}</p>
      </div>
      <StepsList steps={steps} accent={accent} />
    </SectionReveal>
  );
}

function StepsList({
  steps,
  accent,
}: {
  steps: Step[];
  accent: "coral" | "teal";
}) {
  return (
    <ol className="relative space-y-5">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const isLast = i === steps.length - 1;
        return (
          <li key={s.title} className="relative pl-14">
            {!isLast && (
              <span
                aria-hidden
                className="absolute left-[22px] top-12 bottom-[-20px] w-px bg-ink/10"
              />
            )}
            <span
              className={cn(
                "absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-md text-cream font-display text-base shadow-soft",
                accent === "coral" ? "bg-coral" : "bg-teal"
              )}
              aria-hidden
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="flex items-start gap-2 mb-1">
              <span className="text-xs font-medium uppercase tracking-wider text-inkMuted">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h4 className="font-display text-lg sm:text-xl text-ink leading-snug">{s.title}</h4>
            <p className="mt-1 text-inkSoft leading-relaxed">{s.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
