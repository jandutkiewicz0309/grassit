import type { APIEvent } from "@solidjs/start/server";
import data from "~/data/product.json";

export const runtime = "node";

const SITE_URL = () => process.env.SITE_URL || "https://grassit.pl";

// ---------------------------------------------------------------------------
//  HTML Email Layout
// ---------------------------------------------------------------------------
function emailLayout(content: string): string {
  const siteUrl = SITE_URL();
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grassit</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#f0f5f1;padding:28px 0;text-align:center;border-bottom:1px solid #e2e8f0;">
              <img src="${siteUrl}/Grassit_logo-monochrom_black.png" alt="Grassit" width="180" style="display:inline-block;max-width:180px;height:auto;" />
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:40px 32px;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#0f172a;padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="color:#94a3b8;font-size:13px;line-height:22px;vertical-align:top;">
                    <strong style="color:#ffffff;font-size:14px;">GRASSIT Sp. z o.o.</strong><br>
                    ul. Kazimierza Wielkiego 47 A<br>
                    32-400 Myslenice, Polska<br>
                    NIP: 6812093897 | REGON: 522476299<br>
                    Tel: <a href="tel:+48515401178" style="color:#94a3b8;text-decoration:none;">+48 515 401 178</a><br>
                    <a href="mailto:biuro@grassit.pl" style="color:#16a34a;text-decoration:none;">biuro@grassit.pl</a>
                  </td>
                  <td style="text-align:right;vertical-align:top;white-space:nowrap;">
                    <a href="https://www.facebook.com/grassitpolska" style="display:inline-block;width:36px;height:36px;background-color:#1e293b;border-radius:50%;text-align:center;line-height:36px;text-decoration:none;margin-left:8px;color:#ffffff;font-size:16px;font-weight:bold;" title="Facebook">f</a>
                    <a href="https://www.instagram.com/grassit.pl/" style="display:inline-block;width:36px;height:36px;background-color:#1e293b;border-radius:50%;text-align:center;line-height:36px;text-decoration:none;margin-left:8px;color:#ffffff;font-size:16px;" title="Instagram">ig</a>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0;color:#475569;font-size:11px;text-align:center;">
                &copy; ${year} Grassit. Wszelkie prawa zastrzezone.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
//  Template: Potwierdzenie kontaktu
// ---------------------------------------------------------------------------
function contactConfirmationTemplate(name: string): string {
  return emailLayout(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#0f172a;">
      Dziekujemy za kontakt!
    </h1>
    <p style="margin:0 0 12px;font-size:16px;color:#475569;line-height:26px;">
      Czesc <strong style="color:#0f172a;">${name}</strong>,
    </p>
    <p style="margin:0 0 24px;font-size:16px;color:#475569;line-height:26px;">
      Otrzymalismy Twoja wiadomosc. Nasz zespol odpowie w ciagu kilku dni roboczych.
      Jezeli potrzebujesz pilnej informacji, zapraszamy do kontaktu telefonicznego
      pod numerem <strong style="color:#0f172a;">+48 515 401 178</strong>.
    </p>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
    <p style="margin:0;font-size:16px;color:#475569;line-height:26px;">
      Pozdrawiamy,<br>
      <strong style="color:#0f172a;">Zespol Grassit</strong>
    </p>
  `);
}

// ---------------------------------------------------------------------------
//  Template: Potwierdzenie zamowienia probki
// ---------------------------------------------------------------------------
function sampleOrderConfirmationTemplate(
  name: string,
  productName: string,
  productId: string,
  technicalCardUrl: string | null,
): string {
  const siteUrl = SITE_URL();

  const techCardButton = technicalCardUrl
    ? `<a href="${technicalCardUrl}" target="_blank" style="display:inline-block;margin-top:16px;padding:12px 24px;background-color:#2563eb;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
        Pobierz karte techniczna (PDF)
      </a>`
    : "";

  return emailLayout(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#0f172a;">
      Dziekujemy za zamowienie probki!
    </h1>
    <p style="margin:0 0 12px;font-size:16px;color:#475569;line-height:26px;">
      Czesc <strong style="color:#0f172a;">${name}</strong>,
    </p>
    <p style="margin:0 0 24px;font-size:16px;color:#475569;line-height:26px;">
      Otrzymalismy Twoje zapytanie dotyczace probki produktu. Nasz zespol
      skontaktuje sie z Toba w celu potwierdzenia zamowienia.
    </p>

    <!-- Product card -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;margin-bottom:24px;">
      <tr>
        <td style="padding:20px 24px;">
          <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Produkt</p>
          <p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#0f172a;">${productName}</p>
          <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">ID produktu</p>
          <p style="margin:0;font-size:14px;color:#0f172a;">${productId}</p>
          ${techCardButton}
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:16px;color:#475569;line-height:26px;">
      Pozdrawiamy,<br>
      <strong style="color:#0f172a;">Zespol Grassit</strong>
    </p>
  `);
}

// ---------------------------------------------------------------------------
//  API POST handler
// ---------------------------------------------------------------------------
export async function POST({ request }: APIEvent) {
  console.log("API /api/send-email HIT");

  try {
    if (!process.env.SMTP_PASS || !process.env.SMTP_USER) {
      console.error("Brak konfiguracji SMTP w .env");
      return new Response(
        JSON.stringify({ ok: false, error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const nodemailer = await import("nodemailer");

    const body = await request.json();
    const { subject, payload } = body as {
      subject?: string;
      payload: Record<string, any>;
    };

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "pro2.mail.ovh.net",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    try {
      await transporter.verify();
      console.log("SMTP connected");
    } catch (smtpError) {
      console.error("SMTP connection failed:", smtpError);
      throw new Error("Nie mozna polaczyc sie z serwerem pocztowym.");
    }

    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    const adminEmail = "biuro@grassit.pl";
    const p = payload || {};
    const siteUrl = SITE_URL();

    // Rozroznij formularz: zamowienie probki vs kontakt
    const isSampleOrder =
      typeof p.street === "string" &&
      typeof p.zip === "string" &&
      typeof p.city === "string";

    // -----------------------------------------------------------------------
    //  1. Mail do biura (powiadomienie)
    // -----------------------------------------------------------------------
    let adminSubject = subject || "Wiadomosc ze strony Grassit";
    let adminText = "";

    if (isSampleOrder) {
      adminSubject = `Zamowienie probki: ${p.productName || "Ogolne"}`;
      adminText =
        `NOWE ZAMOWIENIE PROBKI:\n\n` +
        `Produkt: ${p.productName || "-"}\n` +
        `ID: ${p.productId || "-"}\n` +
        `Imie i nazwisko: ${p.name || ""} ${p.lastName || ""}\n` +
        `Email: ${p.email || ""}\n` +
        `Telefon: ${p.phoneNumber || ""}\n` +
        `Adres: ${p.street || ""}, ${p.zip || ""} ${p.city || ""}\n` +
        `Firma: ${p.company || "-"}\n` +
        `NIP: ${p.nip || "-"}\n` +
        `Uwagi: ${p.notes || "-"}`;
    } else {
      adminSubject = `Formularz kontaktowy: ${p.name || "Gosc"}`;
      adminText =
        `NOWA WIADOMOSC KONTAKTOWA:\n\n` +
        `Imie i nazwisko: ${p.name || ""} ${p.lastName || ""}\n` +
        `Email: ${p.email || ""}\n` +
        `Telefon: ${p.phoneNumber || ""}\n` +
        `Wiadomosc:\n${p.message || "-"}`;
    }

    await transporter.sendMail({
      from: `"Formularz Grassit" <${from}>`,
      to: adminEmail,
      replyTo: p.email,
      subject: adminSubject,
      text: adminText,
    });

    console.log("Admin email sent");

    // -----------------------------------------------------------------------
    //  2. Mail do klienta (potwierdzenie HTML)
    // -----------------------------------------------------------------------
    if (p.email) {
      const customerName = `${p.name || ""} ${p.lastName || ""}`.trim() || "Kliencie";

      let customerHtml: string;
      let customerSubject: string;

      if (isSampleOrder) {
        const productName = p.productName || "-";
        const productId = p.productId || "-";

        // Znajdz karte techniczna produktu
        let technicalCardUrl: string | null = null;
        if (p.productId) {
          const product = (data.products as any[]).find(
            (pr) => pr.id === p.productId,
          );
          if (product?.technicalCard) {
            technicalCardUrl = `${siteUrl}${product.technicalCard}`;
          }
        }

        customerSubject = `Grassit - potwierdzenie zamowienia probki: ${productName}`;
        customerHtml = sampleOrderConfirmationTemplate(
          customerName,
          productName,
          productId,
          technicalCardUrl,
        );
      } else {
        customerSubject = "Grassit - dziekujemy za kontakt!";
        customerHtml = contactConfirmationTemplate(customerName);
      }

      await transporter.sendMail({
        from: `"Grassit" <${from}>`,
        to: p.email,
        subject: customerSubject,
        html: customerHtml,
      });

      console.log("Customer confirmation email sent to", p.email);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("API ERROR:", err);
    return new Response(
      JSON.stringify({ ok: false, error: err.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
