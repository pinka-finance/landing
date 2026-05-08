"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  Mic,
  Briefcase,
  Newspaper,
  CheckCircle2,
  AlertCircle,
  Loader2,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  waitlistSchema,
  type WaitlistInput,
  type Role,
  ORG_TYPES,
  INVEST_TYPES,
} from "@/lib/waitlist-schema";

const ROLE_OPTIONS: {
  value: Role;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    value: "donor",
    label: "Donator / Slušatelj podcasta",
    description: "Želim podržati podcaste koje slušam.",
    icon: Headphones,
  },
  {
    value: "creator",
    label: "Kreator podcasta / Organizacija",
    description: "Primam donacije od svoje publike.",
    icon: Mic,
  },
  {
    value: "investor",
    label: "Investitor / Partner",
    description: "Pratim projekt iz fonda ili partnerstva.",
    icon: Briefcase,
  },
  {
    value: "media",
    label: "Medij / Community",
    description: "Pišem o projektu ili pokrivam scenu.",
    icon: Newspaper,
  },
];

type Props = {
  source?: "primary" | "footer" | "modal";
  onSuccess?: () => void;
  compact?: boolean;
  initialRole?: Role;
};

export function WaitlistForm({ source = "primary", onSuccess, compact, initialRole }: Props) {
  const [submitState, setSubmitState] = useState<
    | { status: "idle" }
    | { status: "submitting" }
    | { status: "success" }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const form = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    mode: "onTouched",
    defaultValues: {
      role: initialRole,
      email: "",
      name: "",
      source,
      // role-conditional defaults filled when role changes via the controller below
      investTypes: [],
    } as Partial<WaitlistInput> as WaitlistInput,
  });

  const role = form.watch("role");
  const errors = form.formState.errors;

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitState({ status: "submitting" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, source }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;
      if (!res.ok || !json?.ok) {
        const message =
          (json && "error" in json && json.error) || "Nešto je pošlo po krivu. Pokušaj ponovno.";
        setSubmitState({ status: "error", message });
        return;
      }
      setSubmitState({ status: "success" });
      onSuccess?.();
    } catch {
      setSubmitState({
        status: "error",
        message: "Mreža trenutno ne radi. Pokušaj ponovno za par sekundi.",
      });
    }
  });

  if (submitState.status === "success") {
    return <SuccessState compact={compact} email={form.getValues("email")} />;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Step 1: Role picker */}
      <fieldset>
        <legend className="block text-sm font-medium text-ink mb-2.5">
          Tko si?
        </legend>
        <Controller
          control={form.control}
          name="role"
          render={({ field }) => (
            <div role="radiogroup" aria-required className="grid sm:grid-cols-2 gap-2.5">
              {ROLE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const selected = field.value === opt.value;
                return (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    key={opt.value}
                    onClick={() => {
                      field.onChange(opt.value);
                      // Reset role-specific fields to avoid stale state when switching
                      form.clearErrors();
                      form.setValue("investTypes", [] as never);
                    }}
                    className={cn(
                      "group flex items-start gap-3 rounded-md border p-3.5 text-left transition-all focus-ring",
                      selected
                        ? "border-coral bg-coral/[0.04] shadow-[inset_0_0_0_1px_rgba(232,93,93,0.55)]"
                        : "border-ink/10 hover:border-ink/25 hover:bg-ink/[0.015]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors",
                        selected
                          ? "bg-coral text-cream"
                          : "bg-sand text-inkSoft group-hover:bg-sandDeep"
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-ink">{opt.label}</span>
                      <span className="block text-xs text-inkMuted mt-0.5 leading-snug">
                        {opt.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.role && (
          <p className="form-error" role="alert">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden /> Odaberi jednu opciju.
          </p>
        )}
      </fieldset>

      {/* Step 2: Common fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">
            Email <span className="text-coral" aria-hidden>*</span>
            <span className="sr-only">obavezno</span>
          </Label>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ti@primjer.hr"
            invalid={!!errors.email}
            {...form.register("email")}
          />
          {errors.email && (
            <p className="form-error" role="alert">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden />
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="name">Ime</Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Marin"
            {...form.register("name")}
          />
        </div>
      </div>

      {/* Step 3: Conditional fields */}
      <AnimatePresence mode="wait" initial={false}>
        {role && (
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 pt-1"
          >
            {role === "donor" && <DonorFields form={form} />}
            {role === "creator" && <CreatorFields form={form} />}
            {role === "investor" && <InvestorFields form={form} />}
            {role === "media" && <MediaFields form={form} />}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={submitState.status === "submitting"}
        >
          {submitState.status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Spremam…
            </>
          ) : (
            "Pridruži se waitlist-u"
          )}
        </Button>

        {submitState.status === "error" && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-md bg-rust/8 border border-rust/20 px-3 py-2 text-sm text-rust"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
            <span>{submitState.message}</span>
          </p>
        )}

        <p className="text-xs text-inkMuted leading-relaxed">
          Tvoji podaci ostaju kod nas. Ne dijelimo, ne prodajemo, ne spamamo.{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
            Privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}

// --- Role-specific fragments ---

type FormCtx = ReturnType<typeof useForm<WaitlistInput>>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="form-error" role="alert">
      <AlertCircle className="h-3.5 w-3.5" aria-hidden />
      {message}
    </p>
  );
}

function DonorFields({ form }: { form: FormCtx }) {
  return (
    <div>
      <Label htmlFor="podcasts">Koje podcaste pratiš?</Label>
      <Textarea
        id="podcasts"
        placeholder="npr. Geek Krug, Dobar Dan Hrvatska, …"
        {...form.register("podcasts")}
      />
      <p className="mt-1 text-xs text-inkMuted">Opcionalno — pomaže nam prioritizirati pilote.</p>
    </div>
  );
}

function CreatorFields({ form }: { form: FormCtx }) {
  const errors = form.formState.errors;
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="orgName">
            Naziv podcasta / organizacije <span className="text-coral" aria-hidden>*</span>
          </Label>
          <Input
            id="orgName"
            invalid={!!("orgName" in errors && errors.orgName)}
            {...form.register("orgName")}
          />
          <FieldError message={"orgName" in errors ? errors.orgName?.message : undefined} />
        </div>
        <div>
          <Label htmlFor="link">
            Web ili social <span className="text-coral" aria-hidden>*</span>
          </Label>
          <Input
            id="link"
            inputMode="url"
            placeholder="https://… ili @handle"
            invalid={!!("link" in errors && errors.link)}
            {...form.register("link")}
          />
          <FieldError message={"link" in errors ? errors.link?.message : undefined} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="audienceSize">Veličina audijencije</Label>
          <Input
            id="audienceSize"
            placeholder="npr. ~3k preuzimanja po epizodi"
            {...form.register("audienceSize")}
          />
        </div>
        <div>
          <Label htmlFor="orgType">
            Vrsta <span className="text-coral" aria-hidden>*</span>
          </Label>
          <Controller
            control={form.control}
            name="orgType"
            render={({ field }) => (
              <Select value={field.value as string | undefined} onValueChange={field.onChange}>
                <SelectTrigger
                  id="orgType"
                  invalid={!!("orgType" in errors && errors.orgType)}
                >
                  <SelectValue placeholder="Odaberi…" />
                </SelectTrigger>
                <SelectContent>
                  {ORG_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t === "kreator"
                        ? "Kreator / individualac"
                        : t === "neprofit"
                        ? "Neprofitna organizacija"
                        : t === "firma"
                        ? "Firma"
                        : "Drugo"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={"orgType" in errors ? errors.orgType?.message : undefined} />
        </div>
      </div>
    </>
  );
}

function InvestorFields({ form }: { form: FormCtx }) {
  const errors = form.formState.errors;
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fundName">
            Naziv fonda / firme <span className="text-coral" aria-hidden>*</span>
          </Label>
          <Input
            id="fundName"
            invalid={!!("fundName" in errors && errors.fundName)}
            {...form.register("fundName")}
          />
          <FieldError message={"fundName" in errors ? errors.fundName?.message : undefined} />
        </div>
        <div>
          <Label htmlFor="fundLink">
            Web <span className="text-coral" aria-hidden>*</span>
          </Label>
          <Input
            id="fundLink"
            inputMode="url"
            placeholder="https://…"
            invalid={!!("fundLink" in errors && errors.fundLink)}
            {...form.register("fundLink")}
          />
          <FieldError message={"fundLink" in errors ? errors.fundLink?.message : undefined} />
        </div>
      </div>
      <div>
        <Label>
          Tip ulaganja / suradnje <span className="text-coral" aria-hidden>*</span>
        </Label>
        <Controller
          control={form.control}
          name="investTypes"
          render={({ field }) => (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {INVEST_TYPES.map((opt) => {
                const checked = (field.value as string[] | undefined)?.includes(opt) ?? false;
                return (
                  <label
                    key={opt}
                    className={cn(
                      "flex items-center gap-2 rounded-md border px-3 py-2.5 cursor-pointer transition-all text-sm",
                      checked
                        ? "border-coral bg-coral/[0.04]"
                        : "border-ink/10 hover:border-ink/25"
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(c) => {
                        const current = (field.value as string[] | undefined) ?? [];
                        field.onChange(
                          c ? [...current, opt] : current.filter((v) => v !== opt)
                        );
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          )}
        />
        <FieldError
          message={"investTypes" in errors ? errors.investTypes?.message : undefined}
        />
      </div>
    </>
  );
}

function MediaFields({ form }: { form: FormCtx }) {
  const errors = form.formState.errors;
  return (
    <>
      <div>
        <Label htmlFor="publication">
          Naziv publikacije <span className="text-coral" aria-hidden>*</span>
        </Label>
        <Input
          id="publication"
          invalid={!!("publication" in errors && errors.publication)}
          {...form.register("publication")}
        />
        <FieldError
          message={"publication" in errors ? errors.publication?.message : undefined}
        />
      </div>
      <div>
        <Label htmlFor="coverageType">Tip pokrivanja</Label>
        <Textarea
          id="coverageType"
          placeholder="npr. featured story, podcast intervju, newsletter mention…"
          {...form.register("coverageType")}
        />
      </div>
    </>
  );
}

function SuccessState({
  email,
  compact,
}: {
  email: string;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-lg border border-forest/30 bg-forest/[0.06] p-6 sm:p-8 text-center",
        compact ? "py-6" : ""
      )}
      role="status"
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream">
        <CheckCircle2 className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="font-display text-2xl text-ink mb-1">Pridružio si se. ✓</h3>
      <p className="text-inkSoft text-sm sm:text-base">
        Poslali smo potvrdu na <strong className="text-ink">{email}</strong>. Vidimo se na
        launchu.
      </p>
    </motion.div>
  );
}
