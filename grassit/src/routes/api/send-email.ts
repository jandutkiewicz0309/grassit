import type { APIEvent } from "@solidjs/start/server";
import nodemailer from "nodemailer";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  return new Response("send-email: up", { status: 200 });
}

export async function POST({ request }: APIEvent) {
  try {
    const { to, subject, payload } = (await request.json()) as {
      to: string;
      subject?: string;
      payload: any;
    };

    const allowSelfSigned = process.env.SMTP_ALLOW_SELF_SIGNED === "true";
    const hasEnv =
      !!process.env.SMTP_HOST &&
      !!process.env.SMTP_USER &&
      !!process.env.SMTP_PASS;

    // 1) Zbuduj transporter: ENV → produkcja / Ethereal → dev
    let transporter: nodemailer.Transporter;

    if (hasEnv) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // np. smtp.gmail.com
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true", // true dla 465
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        tls: allowSelfSigned ? { rejectUnauthorized: false } : undefined,
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      console.warn(
        "[send-email] Brak SMTP_* w .env – używam Ethereal test account"
      );
    }

    // 2) Opcjonalne verify – jeśli self-signed i verify padnie, kontynuuj z ostrzeżeniem
    try {
      await transporter.verify();
    } catch (e) {
      if (allowSelfSigned) {
        console.warn(
          "[send-email] transporter.verify failed, continue due to SMTP_ALLOW_SELF_SIGNED=true:",
          e
        );
      } else {
        throw new Error(
          "SMTP connection verify failed – sprawdź host/port/secure/user/pass"
        );
      }
    }

    const from =
      process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "no-reply@example.com";

    const text =
      `Nowy formularz kontaktowy:\n` +
      `Imię: ${payload?.name ?? ""}\n` +
      `Nazwisko: ${payload?.lastName ?? ""}\n` +
      `E-mail: ${payload?.email ?? ""}\n` +
      `Telefon: ${payload?.phoneNumber ?? ""}\n` +
      (payload?.message ? `\nWiadomość:\n${payload.message}\n` : "");

    const html =
      `<h2>Nowy formularz kontaktowy</h2>` +
      `<p><b>Imię:</b> ${esc(payload?.name ?? "")}</p>` +
      `<p><b>Nazwisko:</b> ${esc(payload?.lastName ?? "")}</p>` +
      `<p><b>E-mail:</b> ${esc(payload?.email ?? "")}</p>` +
      `<p><b>Telefon:</b> ${esc(String(payload?.phoneNumber ?? ""))}</p>` +
      (payload?.message
        ? `<p><b>Wiadomość:</b><br/>${esc(payload.message).replace(
            /\n/g,
            "<br/>"
          )}</p>`
        : "");

    const info = await transporter.sendMail({
      from,
      to,
      subject: subject || "Formularz kontaktowy",
      text,
      html,
      replyTo: payload?.email,
    });

    const preview = nodemailer.getTestMessageUrl?.(info);
    if (preview) console.log("[send-email] Ethereal preview URL:", preview);

    return new Response(JSON.stringify({ ok: true, preview }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("[send-email] ERROR:", err);
    return new Response(
      JSON.stringify({ ok: false, error: err?.message ?? "Internal error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
