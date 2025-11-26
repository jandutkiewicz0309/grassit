import type { APIEvent } from "@solidjs/start/server";
import data from "~/data/product.json";

export const runtime = "node";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST({ request }: APIEvent) {
  console.log("✅ POST HANDLER HIT");

  try {
    if (!process.env.SMTP_PASS) {
      throw new Error("SMTP_PASS IS MISSING FROM ENV (SERVER)");
    }

    const nodemailer = await import("nodemailer");

    const { to, subject, payload } = (await request.json()) as {
      to: string;
      subject?: string;
      payload: Record<string, unknown>;
    };

    console.log("SMTP DEBUG:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER,
      passExists: !!process.env.SMTP_PASS,
    });

    const transporter = nodemailer.createTransport({
      host: "pro2.mail.ovh.net",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
      },
    });

    await transporter.verify();

    await transporter.verify();

    const from =
      process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "no-reply@example.com";

    const p: any = payload || {};

    const isAsk =
      typeof p?.street === "string" &&
      typeof p?.zip === "string" &&
      typeof p?.city === "string";

    const products = (data as any)?.products ?? [];

    const productMeta =
      (p.productId && products.find((x: any) => x.id === p.productId)) ||
      (p.sku &&
        products.find((x: any) => x?.details?.catalogNumber === p.sku)) ||
      null;

    const askText =
      `Zapytanie o produkt:\n` +
      (p.productName ? `Produkt: ${p.productName}\n` : "") +
      (p.sku ? `Numer katalogowy: ${p.sku}\n` : "") +
      `Imię: ${p.name ?? ""}\n` +
      `Nazwisko: ${p.lastName ?? ""}\n` +
      `E-mail: ${p.email ?? ""}\n` +
      `Telefon: ${p.phoneNumber ?? ""}\n` +
      (p.notes ? `\nUwagi:\n${p.notes}\n` : "");

    const contactText =
      `Nowy formularz kontaktowy:\n` +
      `Imię: ${p.name ?? ""}\n` +
      `Nazwisko: ${p.lastName ?? ""}\n` +
      `E-mail: ${p.email ?? ""}\n` +
      `Telefon: ${p.phoneNumber ?? ""}\n` +
      (p.message ? `\nWiadomość:\n${p.message}\n` : "");

    const text = isAsk ? askText : contactText;

    const finalSubject =
      subject ||
      (isAsk
        ? `Zapytanie o produkt: ${p.productName ?? ""}`
        : "Formularz kontaktowy");

    const info = await transporter.sendMail({
      from,
      to,
      subject: finalSubject,
      text,
      replyTo: p?.email as string | undefined,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error(" [send-email] ERROR:", err);
    return new Response(
      JSON.stringify({ ok: false, error: err?.message ?? "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
