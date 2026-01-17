import type { APIEvent } from "@solidjs/start/server";
import data from "~/data/product.json";

// Wymuszamy runtime Node.js (wymagane dla nodemailer)
export const runtime = "node";

export async function POST({ request }: APIEvent) {
  console.log("✅ API /api/send-email HIT");

  try {
    // 1. Sprawdzenie zmiennych środowiskowych
    if (!process.env.SMTP_PASS || !process.env.SMTP_USER) {
      console.error("❌ Brak konfiguracji SMTP w .env");
      return new Response(
        JSON.stringify({ ok: false, error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Dynamiczny import nodemailer
    const nodemailer = await import("nodemailer");

    // 3. Pobranie danych z requestu
    const body = await request.json();
    const { to, subject, payload } = body as {
      to: string;
      subject?: string;
      payload: Record<string, any>;
    };

    // 4. Konfiguracja Transportera (ZGODNA Z TWOIM .ENV)
    // Używamy zmiennych z process.env zamiast wpisywać "na sztywno"
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "pro2.mail.ovh.net",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === "true", // true dla 465, false dla 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // To pomaga przy problemach z certyfikatami, ale docelowo lepiej usunąć rejectUnauthorized: false na produkcji jeśli certyfikat jest ok
        rejectUnauthorized: false, 
      },
    });

    // 5. Weryfikacja połączenia SMTP
    try {
      await transporter.verify();
      console.log("✅ SMTP Connected successfully");
    } catch (smtpError) {
      console.error("❌ SMTP Connection Failed:", smtpError);
      throw new Error("Nie można połączyć się z serwerem pocztowym.");
    }

    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    const p = payload || {};

    // Logika rozróżniania formularzy
    // Jeśli mamy dane adresowe -> to jest zamówienie próbki / zapytanie o produkt
    const isAsk =
      typeof p?.street === "string" &&
      typeof p?.zip === "string" &&
      typeof p?.city === "string";

    // Budowanie treści maila
    let finalSubject = subject || "Wiadomość ze strony Grassit";
    let textContent = "";

    if (isAsk) {
      finalSubject = `Zamówienie próbki / Zapytanie: ${p.productName || "Ogólne"}`;
      textContent = `NOWE ZAMÓWIENIE PRÓBKI:\n\n` +
        `Produkt: ${p.productName || "-"}\n` +
        `Imię i nazwisko: ${p.name || ""} ${p.lastName || ""}\n` +
        `Email: ${p.email || ""}\n` +
        `Telefon: ${p.phoneNumber || ""}\n` +
        `Adres: ${p.street || ""}, ${p.zip || ""} ${p.city || ""}\n` +
        `Uwagi: ${p.notes || "-"}`;
    } else {
      finalSubject = `Formularz kontaktowy: ${p.name || "Gość"}`;
      textContent = `NOWA WIADOMOŚĆ KONTAKTOWA:\n\n` +
        `Imię i nazwisko: ${p.name || ""} ${p.lastName || ""}\n` +
        `Email: ${p.email || ""}\n` +
        `Telefon: ${p.phoneNumber || ""}\n` +
        `Wiadomość:\n${p.message || "-"}`;
    }

    // 6. Wysyłka
    await transporter.sendMail({
      from: `"Formularz Grassit" <${from}>`,
      to: to, // Adres docelowy (biuro@grassit.pl)
      replyTo: p.email, // Abyś mógł kliknąć "Odpowiedz" i pisało do klienta
      subject: finalSubject,
      text: textContent,
    });

    console.log("✅ Email sent successfully");

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("🔥 API ERROR:", err);
    // Zwracamy JSON z błędem, a nie HTML 500!
    return new Response(
      JSON.stringify({ ok: false, error: err.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}