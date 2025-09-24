// src/utils/sendMail.ts
import type { OnSubmitOrderForm } from "~/utils/types";

export async function sendContactEmail(data: OnSubmitOrderForm) {
  const resp = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: "dutkiewiczjann@gmail.com",
      subject: "Nowa wiadomość z formularza",
      payload: data,
    }),
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.json();
}
