import type { OnSubmitOrderForm } from "~/utils/types";

export async function sendContactEmail(data: OnSubmitOrderForm) {
  const API_URL = "/mail.php"; 

  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject: "Wiadomość ze strony",
      payload: data,
    }),
  });

  const textResponse = await resp.text();

  if (!resp.ok) {
    console.error("Błąd serwera:", textResponse);
    throw new Error(`HTTP Error: ${resp.status}`);
  }

  try {
    return JSON.parse(textResponse);
  } catch (e) {
    console.error("Nieprawidłowy JSON z PHP:", textResponse);
    throw new Error("Błąd odpowiedzi serwera");
  }
}