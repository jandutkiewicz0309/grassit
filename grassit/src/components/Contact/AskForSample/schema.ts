import { z } from "zod";
import { COUNTRY_VALIDATION } from "~/config/validation";
import { resolveSite, type Country } from "~/config/site";
import { t } from "~/utils/translations";

const NAME_RE = /^[\p{L}\p{M}]+([ '-][\p{L}\p{M}]+)*$/u;

/**
 * Built on demand: the messages come from `t`, and the postcode / tax-id rules
 * depend on the market this domain serves - a German customer must not be
 * validated against the Polish `12-345` postcode and the NIP checksum.
 */
export function makeAskProductSchema(country: Country = resolveSite().country) {
  const rules = COUNTRY_VALIDATION[country];

  return z.object({
    name: z
      .string()
      .trim()
      .min(2, t("errors.minChars"))
      .regex(NAME_RE, t("errors.lettersOnly")),
    lastName: z
      .string()
      .trim()
      .min(2, t("errors.minChars"))
      .regex(NAME_RE, t("errors.lettersOnly")),
    email: z.string().trim().email(t("errors.email")),
    phoneNumber: z.string().trim().regex(/^\+?[0-9\s-]{7,20}$/, t("errors.phone")),
    street: z.string().trim().min(3, t("errors.street")),
    zip: z
      .string()
      .trim()
      .regex(rules.zip, t("errors.zipFormat", { example: rules.zipExample })),
    city: z.string().trim().min(2, t("errors.city")),
    company: z.string().trim().optional(),
    nip: z
      .string()
      .trim()
      .optional()
      .refine((v) => !v || rules.isValidVatId(v), t("errors.vatInvalid")),
    notes: z.string().trim().optional(),
    // Product metadata, carried through into the e-mail payload.
    productId: z.string().trim().optional(),
    productName: z.string().trim().optional(),
    sku: z.string().trim().optional(),
  });
}

export type AskProductForm = z.infer<ReturnType<typeof makeAskProductSchema>>;
