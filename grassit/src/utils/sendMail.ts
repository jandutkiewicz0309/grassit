import toast from "solid-toast";
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

export async function sendEmailWithToast(
  data: OnSubmitOrderForm,
  successMessage: string = "Dziękujemy! Formularz został wysłany."
): Promise<boolean> {
  const toastId = toast.loading("Wysyłanie wiadomości...", {
    style: {
      background: "#f8fafc",
      color: "#0f172a",
      border: "1px solid #e2e8f0",
    },
  });

  try {
    const res = await sendContactEmail(data);
    if (!res.ok) {
      throw new Error(res.error || "Błąd wysyłki");
    }

    toast.success(successMessage, {
      id: toastId,
      style: {
        background: "#f0fdf4",
        color: "#166534",
        border: "1px solid #bbf7d0",
      },
      iconTheme: {
        primary: "#16a34a",
        secondary: "#fff",
      },
    });
    return true;
  } catch (e: any) {
    console.error(e);
    toast.error("Nie udało się wysłać formularza. Spróbuj ponownie.", {
      id: toastId,
      style: {
        background: "#fef2f2",
        color: "#991b1b",
        border: "1px solid #fecaca",
      },
      iconTheme: {
        primary: "#dc2626",
        secondary: "#fff",
      },
    });
    return false;
  }
}