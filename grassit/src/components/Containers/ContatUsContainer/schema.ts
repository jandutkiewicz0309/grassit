// src/components/ContactUs/schema.ts
import { z } from "zod";

const NAME_RE = /^[\p{L}\p{M}]+([ '-][\p{L}\p{M}]+)*$/u;

export default z.object({
  name: z
    .string()
    .min(2, "Podaj przynajmniej 2 znaki")
    .regex(NAME_RE, "Imię może zawierać tylko litery"),
  lastName: z
    .string()
    .min(2, "Podaj przynajmniej 2 znaki")
    .regex(NAME_RE, "Nazwisko może zawierać tylko litery"),
  email: z.string().email("Podaj poprawny adres e-mail"),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9\s-]{7,20}$/, "Podaj poprawny numer telefonu"),
  message: z.string().min(5, "Wiadomość jest zbyt krótka"),
});
