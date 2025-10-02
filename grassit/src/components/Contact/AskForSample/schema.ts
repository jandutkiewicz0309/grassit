// schema.ts (lub gdzie trzymasz schemat)
import { z } from "zod";

const NAME_RE = /^[\p{L}\p{M}]+([ '-][\p{L}\p{M}]+)*$/u;
const ZIP_PL = /^\d{2}-\d{3}$/;

function isValidNIP(raw: string) {
  const nip = raw.replace(/\D/g, "");
  if (nip.length !== 10) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const s = w.reduce((acc, wi, i) => acc + wi * Number(nip[i]), 0);
  return s % 11 === Number(nip[9]);
}

export const askProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Podaj przynajmniej 2 znaki")
    .regex(NAME_RE, "Tylko litery"),
  lastName: z
    .string()
    .trim()
    .min(2, "Podaj przynajmniej 2 znaki")
    .regex(NAME_RE, "Tylko litery"),
  email: z.string().trim().email("Podaj poprawny e-mail"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,20}$/, "Podaj poprawny numer telefonu"),
  street: z.string().trim().min(3, "Podaj ulicę i numer"),
  zip: z.string().trim().regex(ZIP_PL, "Format 12-345"),
  city: z.string().trim().min(2, "Podaj miasto"),
  company: z.string().trim().optional(),
  nip: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || isValidNIP(v), "Nieprawidłowy NIP"),
  notes: z.string().trim().optional(),
  // metadane produktu (opcjonalne, ale chcemy je mieć w payloadzie):
  productId: z.string().trim().optional(),
  productName: z.string().trim().optional(),
  sku: z.string().trim().optional(),
});

export type AskProductForm = z.infer<typeof askProductSchema>;
