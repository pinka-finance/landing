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
} from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { cn } from "@/lib/utils";

const donorSteps = [
  {
    icon: QrCode,
    title: "Skeniraj QR",
    body: "na podcast stranici ili u show notes-ima — telefonom, kao bilo koju drugu uplatu.",
  },
  {
    icon: Banknote,
    title: "Potvrdi u svojoj banci ili Revolutu",
    body: "iznos sam biraš. Bez kreiranja računa, bez kartice, bez novih aplikacija.",
  },
  {
    icon: CheckCircle2,
    title: "Donacija stigne u sekundi",
    body: "kreatoru ili organizaciji koju si odabrao. Ti dobiješ potvrdu, oni dobiju novac.",
  },
];

const creatorSteps = [
  {
    icon: Settings2,
    title: "Registriraj projekt",
    body: "postavi tko prima donacije i u kojim postocima — ti, tim, organizacija ili kombinacija.",
  },
  {
    icon: Share2,
    title: "Pinka generira QR",
    body: "dijeli ga s publikom kako ti odgovara — na webu, u opisima epizoda, na društvenim mrežama.",
  },
  {
    icon: TrendingUp,
    title: "Donacije se akumuliraju on-chain",
    body: "javno, transparentno, real-time. Ti i tvoja publika vidite isto stanje u istom trenu.",
  },
  {
    icon: Wallet,
    title: "Podigni kad budeš spreman",
    body: "poveži svoj wallet ili banku, šalji u SEPA u par klikova. Bez minimuma, bez obaveza.",
  },
];

type Tab = "donor" | "creator";

export function HowItWorks() {
  const [tab, setTab] = useState<Tab>("donor");

  return (
    <section
      id="how"
      className="section-padding bg-cream"
      aria-labelledby="how-heading"
    >
      <div className="container-content">
        <SectionReveal className="max-w-3xl">
          <span className="eyebrow">Kako radi</span>
          <h2 id="how-heading" className="mt-4 text-display-lg">
            Jednostavno za sve.
          </h2>
          <p className="mt-5 text-lg text-inkSoft">
            Iste tračnice, dvije strane: donator vidi QR i potvrdu. Kreator vidi novac na
            računu — bez posrednika koji uzima dio na putu.
          </p>
        </SectionReveal>

        {/* Mobile tabs */}
        <div className="md:hidden mt-10">
          <div
            role="tablist"
            aria-label="Kako radi"
            className="grid grid-cols-2 gap-1 rounded-md bg-sand p-1 text-sm font-medium"
          >
            <TabButton active={tab === "donor"} onClick={() => setTab("donor")} controls="panel-donor">
              Za donatore
            </TabButton>
            <TabButton active={tab === "creator"} onClick={() => setTab("creator")} controls="panel-creator">
              Za kreatore
            </TabButton>
          </div>
          <div className="mt-6">
            {tab === "donor" ? (
              <Panel id="panel-donor" labelledBy="tab-donor">
                <StepsList steps={donorSteps} accent="coral" />
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
            title="Za donatore"
            subtitle="Tri koraka. Bez novog računa."
            accent="coral"
            steps={donorSteps}
          />
          <Column
            title="Za kreatore i organizacije"
            subtitle="Četiri koraka. Bez tehničke gimnastike."
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
  steps: typeof donorSteps;
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
  steps: typeof donorSteps;
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
