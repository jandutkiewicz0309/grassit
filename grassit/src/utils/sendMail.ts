import type { OnSubmitOrderForm } from "~/utils/types";

export async function sendContactEmail(data: OnSubmitOrderForm) {
  console.log("🚀 Wysyłanie danych do API:", data);

  const resp = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: "biuro@grassit.pl",
      subject: "Formularz kontaktowy",
      payload: data,
    }),
  });

  const textResponse = await resp.text();

  if (!resp.ok) {
    console.error("Błąd serwera (treść):", textResponse);
    throw new Error(`Błąd wysyłania: ${resp.status}`);
  }

  try {
    return JSON.parse(textResponse);
  } catch (e) {
    console.error("Otrzymano HTML zamiast JSON. Prawdopodobnie błąd 404 lub 500 po stronie serwera.", textResponse);
    throw new Error("Serwer zwrócił niepoprawne dane (HTML zamiast JSON).");
  }
}