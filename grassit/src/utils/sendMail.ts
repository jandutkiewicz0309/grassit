import toast from "solid-toast";
import { resolveSite } from "~/config/site";
import { locale, t } from "~/utils/translations";
import type { OnSubmitOrderForm } from "~/utils/types";

export async function sendContactEmail(data: OnSubmitOrderForm) {
  const API_URL = "/mail.php";
  const site = resolveSite();

  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject: t("toast.subject"),
      // mail.php picks the template language and the sender domain from these.
      locale: locale(),
      country: site.country,
      payload: data,
    }),
  });

  const textResponse = await resp.text();

  if (!resp.ok) {
    console.error("Mail endpoint error:", textResponse);
    throw new Error(`HTTP Error: ${resp.status}`);
  }

  try {
    return JSON.parse(textResponse);
  } catch {
    console.error("Invalid JSON from mail.php:", textResponse);
    throw new Error("Invalid server response");
  }
}

export async function sendEmailWithToast(
  data: OnSubmitOrderForm,
  successMessage: string = t("toast.success"),
): Promise<boolean> {
  const toastId = toast.loading(t("toast.sending"), {
    style: {
      background: "#f8fafc",
      color: "#0f172a",
      border: "1px solid #e2e8f0",
    },
  });

  try {
    const res = await sendContactEmail(data);
    if (!res.ok) {
      throw new Error(res.error || "Send failed");
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
  } catch (e) {
    console.error(e);
    toast.error(t("toast.error"), {
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
