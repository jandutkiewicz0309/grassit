import { z } from "zod";
import { t } from "~/utils/translations";

const NAME_RE = /^[\p{L}\p{M}]+([ '-][\p{L}\p{M}]+)*$/u;

/**
 * Built on demand rather than at module scope: the messages read from `t`, and
 * a module-level `z.object({...})` would freeze them at the initial language.
 */
export function makeContactSchema() {
  return z.object({
    name: z
      .string()
      .min(2, t("errors.minChars"))
      .regex(NAME_RE, t("errors.firstNameLetters")),
    lastName: z
      .string()
      .min(2, t("errors.minChars"))
      .regex(NAME_RE, t("errors.lastNameLetters")),
    email: z.string().email(t("errors.email")),
    phoneNumber: z.string().regex(/^\+?[0-9\s-]{7,20}$/, t("errors.phone")),
    message: z.string().min(5, t("errors.messageShort")),
  });
}

export type ContactForm = z.infer<ReturnType<typeof makeContactSchema>>;
