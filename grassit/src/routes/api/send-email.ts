// src/routes/api/send-email.ts
import type { APIEvent } from "@solidjs/start/server";
import nodemailer from "nodemailer";
import data from "~/data/product.json"; // ⬅️ lookup produktu

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
      payload: Record<string, unknown>;
    };

    const allowSelfSigned = process.env.SMTP_ALLOW_SELF_SIGNED === "true";
    const hasEnv =
      !!process.env.SMTP_HOST &&
      !!process.env.SMTP_USER &&
      !!process.env.SMTP_PASS;

    // 1) Transporter
    let transporter: nodemailer.Transporter;
    if (hasEnv) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
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

    // 2) Verify
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

    // 3) Rozpoznanie wariantu
    const p: any = payload || {};
    const isAsk =
      typeof p?.street === "string" &&
      typeof p?.zip === "string" &&
      typeof p?.city === "string";

    // 3a) Lookup produktu (po productId lub po sku = details.catalogNumber)
    const products = (data as any)?.products ?? [];
    const productMeta =
      (p.productId && products.find((x: any) => x.id === p.productId)) ||
      (p.sku &&
        products.find((x: any) => x?.details?.catalogNumber === p.sku)) ||
      null;

    // URL do produktu na podstawie requestu
    const origin = (() => {
      try {
        const u = new URL(request.url);
        return `${u.protocol}//${u.host}`;
      } catch {
        return "";
      }
    })();
    const productUrl = productMeta
      ? `${origin}/produkty/${productMeta.id}`
      : undefined;

    // ====== ASK PRODUCT ======
    const askText =
      `Zapytanie o produkt:\n` +
      (p.productName
        ? `Produkt: ${p.productName}\n`
        : productMeta
        ? `Produkt: ${productMeta.nameProduct}\n`
        : "") +
      (p.sku
        ? `SKU: ${p.sku}\n`
        : productMeta?.details?.catalogNumber
        ? `SKU: ${productMeta.details.catalogNumber}\n`
        : "") +
      (productMeta?.price ? `Cena: ${productMeta.price}\n` : "") +
      (productUrl ? `Link: ${productUrl}\n` : "") +
      `Imię: ${p.name ?? ""}\n` +
      `Nazwisko: ${p.lastName ?? ""}\n` +
      `E-mail: ${p.email ?? ""}\n` +
      `Telefon: ${p.phoneNumber ?? ""}\n` +
      `Adres: ${p.street ?? ""}, ${p.zip ?? ""} ${p.city ?? ""}\n` +
      (p.company ? `Firma: ${p.company}\n` : "") +
      (p.nip ? `NIP: ${p.nip}\n` : "") +
      (p.notes ? `\nUwagi:\n${p.notes}\n` : "");

    const askHtml =
      `<h2>Zapytanie o produkt</h2>` +
      (p.productName
        ? `<p><b>Produkt:</b> ${esc(String(p.productName))}</p>`
        : productMeta
        ? `<p><b>Produkt:</b> ${esc(String(productMeta.nameProduct))}</p>`
        : "") +
      (p.sku
        ? `<p><b>SKU:</b> ${esc(String(p.sku))}</p>`
        : productMeta?.details?.catalogNumber
        ? `<p><b>SKU:</b> ${esc(String(productMeta.details.catalogNumber))}</p>`
        : "") +
      (productMeta?.price
        ? `<p><b>Cena:</b> ${esc(String(productMeta.price))}</p>`
        : "") +
      (productUrl
        ? `<p><b>Link:</b> <a href="${productUrl}">${productUrl}</a></p>`
        : "") +
      `<p><b>Imię:</b> ${esc(String(p?.name ?? ""))}</p>` +
      `<p><b>Nazwisko:</b> ${esc(String(p?.lastName ?? ""))}</p>` +
      `<p><b>E-mail:</b> ${esc(String(p?.email ?? ""))}</p>` +
      `<p><b>Telefon:</b> ${esc(String(p?.phoneNumber ?? ""))}</p>` +
      `<p><b>Adres:</b> ${esc(String(p?.street ?? ""))}, ${esc(
        String(p?.zip ?? "")
      )} ${esc(String(p?.city ?? ""))}</p>` +
      (p.company ? `<p><b>Firma:</b> ${esc(String(p.company))}</p>` : "") +
      (p.nip ? `<p><b>NIP:</b> ${esc(String(p.nip))}</p>` : "") +
      (p.notes
        ? `<p><b>Uwagi / preferencje:</b><br/>${esc(String(p.notes)).replace(
            /\n/g,
            "<br/>"
          )}</p>`
        : "");

    // ====== KONTAKT ======
    const contactText =
      `Nowy formularz kontaktowy:\n` +
      `Imię: ${p.name ?? ""}\n` +
      `Nazwisko: ${p.lastName ?? ""}\n` +
      `E-mail: ${p.email ?? ""}\n` +
      `Telefon: ${p.phoneNumber ?? ""}\n` +
      (p.message ? `\nWiadomość:\n${p.message}\n` : "");

    const contactHtml =
      `<h2>Nowy formularz kontaktowy</h2>` +
      `<p><b>Imię:</b> ${esc(String(p?.name ?? ""))}</p>` +
      `<p><b>Nazwisko:</b> ${esc(String(p?.lastName ?? ""))}</p>` +
      `<p><b>E-mail:</b> ${esc(String(p?.email ?? ""))}</p>` +
      `<p><b>Telefon:</b> ${esc(String(p?.phoneNumber ?? ""))}</p>` +
      (p.message
        ? `<p><b>Wiadomość:</b><br/>${esc(String(p.message)).replace(
            /\n/g,
            "<br/>"
          )}</p>`
        : "");

    const text = isAsk ? askText : contactText;
    const html = isAsk ? askHtml : contactHtml;
    const finalSubject =
      subject ||
      (isAsk
        ? `Zapytanie o produkt${
            p.productName || productMeta?.nameProduct
              ? `: ${p.productName ?? productMeta?.nameProduct}`
              : ""
          }`
        : "Formularz kontaktowy");

    // 4) Wysyłka
    const info = await transporter.sendMail({
      from,
      to,
      subject: finalSubject,
      text,
      html,
      replyTo: p?.email as string | undefined,
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
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
