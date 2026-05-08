"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle2, ArrowUpRight, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

type Stage = "qr" | "confirm" | "done";

const STAGE_DURATION_MS: Record<Stage, number> = {
  qr: 2400,
  confirm: 1500,
  done: 2200,
};

const NEXT: Record<Stage, Stage> = {
  qr: "confirm",
  confirm: "done",
  done: "qr",
};

export function PhoneMockup({ className }: { className?: string }) {
  // useReducedMotion only used here to halt the looping demo timer for users
  // with the OS opt-out — framer-motion itself collapses durations via
  // MotionProvider, but a perpetual setTimeout chain would still flicker.
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>("qr");

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setStage(NEXT[stage]), STAGE_DURATION_MS[stage]);
    return () => clearTimeout(t);
  }, [stage, reduce]);

  return (
    <div className={cn("relative mx-auto w-full max-w-[320px] sm:max-w-[360px]", className)}>
      {/* Soft background blob */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[40%] bg-coral/15 blur-3xl opacity-70"
      />
      <div
        aria-hidden
        className="absolute -inset-12 rounded-[40%] bg-teal/10 blur-3xl opacity-60"
      />

      {/* Phone frame */}
      <div className="relative aspect-[9/19] w-full rounded-[42px] bg-ink p-[10px] shadow-lift">
        <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-cream">
          {/* Status bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center justify-between px-5 text-[10px] font-medium text-ink">
            <span>9:41</span>
            <span aria-hidden className="absolute left-1/2 top-1.5 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-3 rounded-[1.5px] bg-ink" />
              <span className="h-1.5 w-3 rounded-[1.5px] bg-ink" />
              <span className="h-1.5 w-4 rounded-[1.5px] bg-ink" />
            </div>
          </div>

          {/* Screen content */}
          <div className="absolute inset-x-0 top-7 bottom-0 flex flex-col">
            {/* Podcast header */}
            <div className="flex items-center gap-2.5 px-4 pt-4 pb-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-coral text-cream">
                <Headphones className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="truncate text-[13px] font-semibold text-ink">Geek Krug</div>
                <div className="truncate text-[10px] text-inkMuted">ep. 142 · Pinka u 5 min</div>
              </div>
            </div>

            <div className="mx-4 mb-3 h-px bg-ink/8" />

            {/* Stage area */}
            <div className="relative flex-1 px-5 pb-5">
              <AnimatePresence mode="wait">
                {stage === "qr" && <StageQR key="qr" />}
                {stage === "confirm" && <StageConfirm key="confirm" />}
                {stage === "done" && <StageDone key="done" />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const transition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

function StageQR() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={transition}
      className="flex h-full flex-col"
    >
      <div className="text-center">
        <p className="text-[11px] font-medium uppercase tracking-wider text-coral-700">
          Doniraj podcastu
        </p>
        <p className="mt-1 text-[15px] font-medium text-ink leading-snug">
          Skeniraj u svojoj banci.
        </p>
      </div>

      <div className="mt-3 flex-1 flex items-center justify-center">
        <div className="rounded-md bg-cream p-3 shadow-soft border border-ink/10">
          <QRCodeArt />
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-[11px] text-inkMuted">SEPA Instant · primatelj: Geek Krug</p>
      </div>
    </motion.div>
  );
}

function StageConfirm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={transition}
      className="flex h-full flex-col items-center justify-center"
    >
      <div className="w-full rounded-md border border-ink/10 bg-white p-4 shadow-soft">
        <p className="text-[10px] uppercase tracking-wider text-inkMuted">U tvojoj banci</p>
        <p className="mt-2 font-display text-2xl text-ink leading-none">5,00 €</p>
        <p className="mt-1 text-[11px] text-inkMuted">Geek Krug · referenca PK-142</p>
        <div className="mt-4 flex items-center gap-2 rounded-sm bg-sand px-3 py-2">
          <motion.span
            className="h-1.5 flex-1 rounded-full bg-coral/30 overflow-hidden relative"
            aria-hidden
          >
            <motion.span
              className="absolute inset-y-0 left-0 bg-coral rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.span>
          <span className="text-[10px] font-medium text-ink">SEPA Instant</span>
        </div>
      </div>
    </motion.div>
  );
}

function StageDone() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={transition}
      className="flex h-full flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-cream"
      >
        <CheckCircle2 className="h-7 w-7" aria-hidden />
      </motion.div>
      <p className="font-display text-xl text-ink leading-snug">5,00 € poslano</p>
      <p className="mt-0.5 text-[11px] text-inkMuted">Stiglo u sekundi.</p>
      <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-coral-700">
        <span>Vidi on-chain</span>
        <ArrowUpRight className="h-3 w-3" aria-hidden />
      </div>
    </motion.div>
  );
}

// Decorative QR-like art (not a real scannable QR)
function QRCodeArt() {
  // 9x9 grid generated deterministically
  const cells: boolean[] = [
    1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 0, 1, 1, 0, 1, 0, 0, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 0, 1, 1, 0, 0, 1, 0, 1,
    1, 1, 0, 1, 1, 1, 0, 1, 1,
    1, 0, 1, 0, 1, 0, 1, 0, 0,
    1, 1, 0, 1, 1, 1, 1, 1, 1,
    0, 1, 1, 0, 0, 1, 0, 0, 1,
    1, 1, 0, 1, 1, 0, 1, 1, 1,
  ].map(Boolean);

  return (
    <div className="relative h-[124px] w-[124px]">
      <div className="grid h-full w-full grid-cols-9 grid-rows-9 gap-[2px]">
        {cells.map((on, i) => (
          <span
            key={i}
            className={cn("rounded-[1.5px]", on ? "bg-ink" : "bg-transparent")}
            aria-hidden
          />
        ))}
      </div>
      {/* Finder squares overlay for QR feel */}
      {[
        "top-0 left-0",
        "top-0 right-0",
        "bottom-0 left-0",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={cn(
            "absolute h-7 w-7 rounded-[3px] border-[3px] border-ink bg-cream",
            pos
          )}
        >
          <span className="absolute inset-1.5 rounded-[1px] bg-ink" />
        </span>
      ))}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-cream px-1.5 py-0.5 shadow-soft border border-ink/10 font-display text-[10px] font-semibold text-coral"
      >
        pinka
      </span>
    </div>
  );
}
