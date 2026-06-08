import { z } from "zod";

export const ROLES = ["donor", "creator", "investor", "media"] as const;
export type Role = (typeof ROLES)[number];

export const ORG_TYPES = ["kreator", "neprofit", "firma", "drugo"] as const;
export const INVEST_TYPES = ["pre-seed", "seed", "partnership", "advisory"] as const;

// Validation messages are localized: schemas are built per-render from the active
// locale's translator so error text matches the chosen language. `t` resolves a
// dot-path key against lib/i18n/messages.ts (the `validation.*` namespace).
type TFunc = (key: string, vars?: Record<string, string | number>) => string;

export function makeWaitlistSchema(t: TFunc) {
  const baseFields = {
    email: z.string().trim().email(t("validation.emailInvalid")),
    name: z.string().trim().max(120).optional().or(z.literal("")),
    source: z.enum(["primary", "footer", "modal"]).optional(),
  };

  const donorSchema = z.object({
    ...baseFields,
    role: z.literal("donor"),
    interests: z.string().trim().max(500).optional().or(z.literal("")),
  });

  const creatorSchema = z.object({
    ...baseFields,
    role: z.literal("creator"),
    orgName: z.string().trim().min(2, t("validation.nameRequired")).max(160),
    link: z
      .string()
      .trim()
      .min(3, t("validation.linkRequired"))
      .max(300)
      .refine((v) => /^(https?:\/\/|www\.|@)/i.test(v) || v.includes("."), {
        message: t("validation.linkInvalid"),
      }),
    audienceSize: z.string().trim().max(120).optional().or(z.literal("")),
    orgType: z.enum(ORG_TYPES, { required_error: t("validation.typeRequired") }),
  });

  const investorSchema = z.object({
    ...baseFields,
    role: z.literal("investor"),
    fundName: z.string().trim().min(2, t("validation.nameRequired")).max(160),
    fundLink: z
      .string()
      .trim()
      .min(3, t("validation.fundLinkRequired"))
      .max(300)
      .refine((v) => /^(https?:\/\/|www\.)/i.test(v) || v.includes("."), {
        message: t("validation.fundLinkInvalid"),
      }),
    investTypes: z
      .array(z.enum(INVEST_TYPES))
      .min(1, t("validation.investTypesMin")),
  });

  const mediaSchema = z.object({
    ...baseFields,
    role: z.literal("media"),
    publication: z.string().trim().min(2, t("validation.publicationRequired")).max(160),
    coverageType: z.string().trim().max(500).optional().or(z.literal("")),
  });

  return z.discriminatedUnion("role", [
    donorSchema,
    creatorSchema,
    investorSchema,
    mediaSchema,
  ]);
}

// Static shape (locale-independent) for typing the form values. Built once with
// an identity translator; only the value types matter here, not the messages.
const identity: TFunc = (k) => k;
export type WaitlistInput = z.infer<ReturnType<typeof makeWaitlistSchema>>;
export const waitlistSchema = makeWaitlistSchema(identity);

export function makeNewsletterSchema(t: TFunc) {
  return z.object({
    email: z.string().trim().email(t("validation.emailInvalid")),
  });
}
export type NewsletterInput = z.infer<ReturnType<typeof makeNewsletterSchema>>;
