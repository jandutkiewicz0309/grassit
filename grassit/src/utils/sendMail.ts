// src/utils/sendMail.ts
import type { OnSubmitOrderForm } from "~/utils/types";

export async function sendContactEmail(data: OnSubmitOrderForm) {
  const resp = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: "biuro@grassit.pl",
      subject: "Nowa wiadomość z formularza",
      payload: data,
    }),
  });
  if (!resp.ok) {
    const msg = await resp.text();
    throw new Error(`HTTP ${resp.status} ${msg}`);
  }
  return resp.json();
}
