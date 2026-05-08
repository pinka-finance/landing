import { z } from "zod";

export const ROLES = ["donor", "creator", "investor", "media"] as const;
export type Role = (typeof ROLES)[number];

export const ORG_TYPES = ["kreator", "neprofit", "firma", "drugo"] as const;
export const INVEST_TYPES = ["pre-seed", "seed", "partnership", "advisory"] as const;

const baseFields = {
  email: z.string().trim().email("Unesi ispravan email."),
  name: z.string().trim().max(120).optional().or(z.literal("")),
  source: z.enum(["primary", "footer", "modal"]).optional(),
};

const donorSchema = z.object({
  ...baseFields,
  role: z.literal("donor"),
  podcasts: z.string().trim().max(500).optional().or(z.literal("")),
});

const creatorSchema = z.object({
  ...baseFields,
  role: z.literal("creator"),
  orgName: z.string().trim().min(2, "Naziv je obavezan.").max(160),
  link: z
    .string()
    .trim()
    .min(3, "Web ili social link je obavezan.")
    .max(300)
    .refine((v) => /^(https?:\/\/|www\.|@)/i.test(v) || v.includes("."), {
      message: "Unesi URL ili handle (npr. https://… ili @handle).",
    }),
  audienceSize: z.string().trim().max(120).optional().or(z.literal("")),
  orgType: z.enum(ORG_TYPES, { required_error: "Odaberi vrstu." }),
});

const investorSchema = z.object({
  ...baseFields,
  role: z.literal("investor"),
  fundName: z.string().trim().min(2, "Naziv je obavezan.").max(160),
  fundLink: z
    .string()
    .trim()
    .min(3, "Web je obavezan.")
    .max(300)
    .refine((v) => /^(https?:\/\/|www\.)/i.test(v) || v.includes("."), {
      message: "Unesi ispravan web URL.",
    }),
  investTypes: z
    .array(z.enum(INVEST_TYPES))
    .min(1, "Odaberi barem jednu opciju."),
});

const mediaSchema = z.object({
  ...baseFields,
  role: z.literal("media"),
  publication: z.string().trim().min(2, "Naziv publikacije je obavezan.").max(160),
  coverageType: z.string().trim().max(500).optional().or(z.literal("")),
});

export const waitlistSchema = z.discriminatedUnion("role", [
  donorSchema,
  creatorSchema,
  investorSchema,
  mediaSchema,
]);

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Unesi ispravan email."),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;
