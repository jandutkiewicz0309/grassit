<?php
/**
 * Contact / sample-order endpoint, shared by grassit.pl, grassit.de and
 * grassit.ch out of the same document root.
 *
 * The client posts `locale` and `country` alongside the form payload; this file
 * picks the customer template language from `locale` and the sender domain from
 * the Host header. The office recipient is the same for all three markets.
 */
error_reporting(E_ALL);
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/mail_debug.log');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Method not allowed"]);
    exit();
}

$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "No data received"]);
    exit();
}

// -------------------------------------------------------------------------
//  Market + language
// -------------------------------------------------------------------------
$KNOWN_HOSTS = ['grassit.pl', 'grassit.de', 'grassit.ch'];

$host = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
$host = preg_replace('/^www\./', '', $host);
if (!in_array($host, $KNOWN_HOSTS, true)) {
    $host = 'grassit.pl';
}
$siteUrl = 'https://' . $host;

$LOCALES = ['pl', 'en', 'de', 'fr', 'it'];
$locale = $data['locale'] ?? 'pl';
if (!in_array($locale, $LOCALES, true)) {
    $locale = 'pl';
}

$country = $data['country'] ?? 'PL';

/** Customer-facing strings. The office mail stays Polish - the team reads it. */
$T = [
    'pl' => [
        'greeting'        => 'Cześć',
        'fallbackName'    => 'Kliencie',
        'contactSubject'  => 'Grassit — dziękujemy za kontakt!',
        'contactTitle'    => 'Dziękujemy za kontakt!',
        'contactBody'     => 'Otrzymaliśmy Twoją wiadomość. Nasz zespół odpowie w ciągu kilku dni roboczych. Jeżeli potrzebujesz pilnej informacji, zapraszamy do kontaktu telefonicznego pod numerem',
        'sampleSubject'   => 'Grassit — potwierdzenie zamówienia próbki:',
        'sampleTitle'     => 'Dziękujemy za zamówienie próbki!',
        'sampleBody'      => 'Otrzymaliśmy Twoje zapytanie dotyczące próbki produktu. Nasz zespół skontaktuje się z Tobą w celu potwierdzenia zamówienia.',
        'productLabel'    => 'Produkt',
        'techCard'        => 'Pobierz kartę techniczną (PDF)',
        'regards'         => 'Pozdrawiamy,',
        'team'            => 'Zespół Grassit',
        'country'         => 'Polska',
        'rights'          => 'Wszelkie prawa zastrzeżone.',
        'vatLabel'        => 'NIP',
    ],
    'en' => [
        'greeting'        => 'Hello',
        'fallbackName'    => 'there',
        'contactSubject'  => 'Grassit — thank you for getting in touch!',
        'contactTitle'    => 'Thank you for getting in touch!',
        'contactBody'     => 'We have received your message. Our team will reply within a few working days. If you need information urgently, you are welcome to call us on',
        'sampleSubject'   => 'Grassit — sample order confirmation:',
        'sampleTitle'     => 'Thank you for your sample order!',
        'sampleBody'      => 'We have received your product sample request. Our team will contact you to confirm the order.',
        'productLabel'    => 'Product',
        'techCard'        => 'Download the data sheet (PDF)',
        'regards'         => 'Kind regards,',
        'team'            => 'The Grassit team',
        'country'         => 'Poland',
        'rights'          => 'All rights reserved.',
        'vatLabel'        => 'VAT ID',
    ],
    'de' => [
        'greeting'        => 'Hallo',
        'fallbackName'    => 'zusammen',
        'contactSubject'  => 'Grassit — vielen Dank für Ihre Nachricht!',
        'contactTitle'    => 'Vielen Dank für Ihre Nachricht!',
        'contactBody'     => 'Wir haben Ihre Nachricht erhalten. Unser Team antwortet innerhalb weniger Werktage. Wenn Sie eine Auskunft dringend benötigen, erreichen Sie uns telefonisch unter',
        'sampleSubject'   => 'Grassit — Bestätigung Ihrer Musterbestellung:',
        'sampleTitle'     => 'Vielen Dank für Ihre Musterbestellung!',
        'sampleBody'      => 'Wir haben Ihre Anfrage zu einem Produktmuster erhalten. Unser Team meldet sich bei Ihnen, um die Bestellung zu bestätigen.',
        'productLabel'    => 'Produkt',
        'techCard'        => 'Datenblatt herunterladen (PDF)',
        'regards'         => 'Mit freundlichen Grüßen,',
        'team'            => 'Ihr Grassit-Team',
        'country'         => 'Polen',
        'rights'          => 'Alle Rechte vorbehalten.',
        'vatLabel'        => 'USt-IdNr.',
    ],
    'fr' => [
        'greeting'        => 'Bonjour',
        'fallbackName'    => 'à vous',
        'contactSubject'  => 'Grassit — merci de nous avoir contactés !',
        'contactTitle'    => 'Merci de nous avoir contactés !',
        'contactBody'     => 'Nous avons bien reçu votre message. Notre équipe vous répondra sous quelques jours ouvrés. Si votre demande est urgente, vous pouvez nous joindre au',
        'sampleSubject'   => 'Grassit — confirmation de votre demande d\'échantillon :',
        'sampleTitle'     => 'Merci pour votre demande d\'échantillon !',
        'sampleBody'      => 'Nous avons bien reçu votre demande d\'échantillon. Notre équipe vous contactera pour confirmer la commande.',
        'productLabel'    => 'Produit',
        'techCard'        => 'Télécharger la fiche technique (PDF)',
        'regards'         => 'Cordialement,',
        'team'            => 'L\'équipe Grassit',
        'country'         => 'Pologne',
        'rights'          => 'Tous droits réservés.',
        'vatLabel'        => 'N° de TVA',
    ],
    'it' => [
        'greeting'        => 'Ciao',
        'fallbackName'    => 'a te',
        'contactSubject'  => 'Grassit — grazie per averci contattato!',
        'contactTitle'    => 'Grazie per averci contattato!',
        'contactBody'     => 'Abbiamo ricevuto il tuo messaggio. Il nostro team risponderà entro pochi giorni lavorativi. Se hai bisogno di un\'informazione urgente, puoi chiamarci al',
        'sampleSubject'   => 'Grassit — conferma della richiesta di campione:',
        'sampleTitle'     => 'Grazie per la tua richiesta di campione!',
        'sampleBody'      => 'Abbiamo ricevuto la tua richiesta di campione. Il nostro team ti contatterà per confermare l\'ordine.',
        'productLabel'    => 'Prodotto',
        'techCard'        => 'Scarica la scheda tecnica (PDF)',
        'regards'         => 'Cordiali saluti,',
        'team'            => 'Il team Grassit',
        'country'         => 'Polonia',
        'rights'          => 'Tutti i diritti riservati.',
        'vatLabel'        => 'P. IVA',
    ],
];

$L = $T[$locale];

$to = "biuro@grassit.pl";
$p = $data['payload'] ?? [];
$messageBody = "";

$isSampleOrder = isset($p['street']) && isset($p['city']);

// -------------------------------------------------------------------------
//  1. Office notification (plain text, always Polish)
// -------------------------------------------------------------------------
$origin = strtoupper($country) . '/' . strtoupper($locale);

if ($isSampleOrder) {
    $subject = "[$origin] ZAMÓWIENIE PRÓBKI: " . ($p['productName'] ?? 'Brak nazwy');
    $messageBody .= "ZAMÓWIENIE PRÓBKI\n\n";
    $messageBody .= "Domena: " . $host . " (" . $origin . ")\n\n";
    $messageBody .= "Produkt: " . ($p['productName'] ?? '-') . "\n";
    $messageBody .= "ID: " . ($p['productId'] ?? '-') . "\n";
    $messageBody .= "Imię i nazwisko: " . ($p['name'] ?? '-') . " " . ($p['lastName'] ?? '-') . "\n";
    $messageBody .= "Email: " . ($p['email'] ?? '-') . "\n";
    $messageBody .= "Telefon: " . ($p['phoneNumber'] ?? '-') . "\n";
    $messageBody .= "Adres: " . ($p['street'] ?? '-') . ", " . ($p['zip'] ?? '-') . " " . ($p['city'] ?? '-') . "\n";
    $messageBody .= "Kraj: " . strtoupper($country) . "\n";
    $messageBody .= "Firma: " . ($p['company'] ?? '-') . "\n";
    $messageBody .= "NIP / VAT ID: " . ($p['nip'] ?? '-') . "\n";
    $messageBody .= "Uwagi: " . ($p['notes'] ?? '-') . "\n";
} else {
    $subject = "[$origin] KONTAKT WWW: " . ($p['name'] ?? 'Gość');
    $messageBody .= "WIADOMOŚĆ Z FORMULARZA KONTAKTOWEGO\n\n";
    $messageBody .= "Domena: " . $host . " (" . $origin . ")\n\n";
    $messageBody .= "Imię i nazwisko: " . ($p['name'] ?? '-') . " " . ($p['lastName'] ?? '-') . "\n";
    $messageBody .= "Email: " . ($p['email'] ?? '-') . "\n";
    $messageBody .= "Telefon: " . ($p['phoneNumber'] ?? '-') . "\n";
    $messageBody .= "Wiadomość: \n" . ($p['message'] ?? '-') . "\n";
}

$adminHeaders  = "From: Formularz Grassit <noreply@" . $host . ">\r\n";
$adminHeaders .= "Reply-To: " . ($p['email'] ?? 'biuro@grassit.pl') . "\r\n";
$adminHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

$adminOk = mail($to, $subject, $messageBody, $adminHeaders);
error_log("ADMIN mail to=$to subject=$subject result=" . ($adminOk ? 'OK' : 'FAIL'));

// -------------------------------------------------------------------------
//  2. Customer confirmation (HTML, in the language they were reading)
// -------------------------------------------------------------------------
$customerOk = true;
$customerEmail = $p['email'] ?? null;

if ($customerEmail) {
    $customerName = trim(($p['name'] ?? '') . ' ' . ($p['lastName'] ?? ''));
    if ($customerName === '') $customerName = $L['fallbackName'];

    if ($isSampleOrder) {
        $productName = $p['productName'] ?? '-';

        // Sent by the client so it always matches product.json, including ids
        // with capitals such as `Football_Pro_50`.
        $techCardUrl = '';
        if (!empty($p['technicalCard'])) {
            $techCardUrl = $siteUrl . $p['technicalCard'];
        }

        $customerSubject = $L['sampleSubject'] . ' ' . $productName;
        $customerBody = buildSampleOrderTemplate($customerName, $productName, $techCardUrl, $siteUrl, $L, $locale);
    } else {
        $customerSubject = $L['contactSubject'];
        $customerBody = buildContactTemplate($customerName, $siteUrl, $L, $locale);
    }

    $customerHeaders  = "From: Grassit <noreply@" . $host . ">\r\n";
    $customerHeaders .= "MIME-Version: 1.0\r\n";
    $customerHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";

    $customerOk = mail($customerEmail, $customerSubject, $customerBody, $customerHeaders);
    error_log("CUSTOMER mail to=$customerEmail locale=$locale result=" . ($customerOk ? 'OK' : 'FAIL'));
}

if ($adminOk) {
    echo json_encode(["ok" => true]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "Mail sending failed"]);
}

// =========================================================================
//  HTML TEMPLATES
// =========================================================================

function emailLayout(string $content, string $siteUrl, array $L, string $locale): string {
    $year = date('Y');

    return '<!DOCTYPE html>
<html lang="' . $locale . '">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Grassit</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

  <!-- HEADER -->
  <tr>
    <td style="background-color:#f0f5f1;padding:28px 0;text-align:center;border-bottom:1px solid #e2e8f0;">
      <img src="' . $siteUrl . '/Grassit_logo-monochrom_black.png" alt="Grassit" width="180" style="display:inline-block;max-width:180px;height:auto;" />
    </td>
  </tr>

  <!-- BODY -->
  <tr>
    <td style="padding:40px 32px;">
      ' . $content . '
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
            32-400 Myślenice, ' . $L['country'] . '<br>
            ' . $L['vatLabel'] . ': 6812093897 | REGON: 522476299<br>
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
        &copy; ' . $year . ' Grassit. ' . $L['rights'] . '
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>';
}

function buildContactTemplate(string $name, string $siteUrl, array $L, string $locale): string {
    $content = '
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#0f172a;">' . $L['contactTitle'] . '</h1>
      <p style="margin:0 0 12px;font-size:16px;color:#475569;line-height:26px;">
        ' . $L['greeting'] . ' <strong style="color:#0f172a;">' . htmlspecialchars($name) . '</strong>,
      </p>
      <p style="margin:0 0 24px;font-size:16px;color:#475569;line-height:26px;">
        ' . $L['contactBody'] . ' <strong style="color:#0f172a;">+48 515 401 178</strong>.
      </p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
      <p style="margin:0;font-size:16px;color:#475569;line-height:26px;">
        ' . $L['regards'] . '<br>
        <strong style="color:#0f172a;">' . $L['team'] . '</strong>
      </p>';

    return emailLayout($content, $siteUrl, $L, $locale);
}

function buildSampleOrderTemplate(string $name, string $productName, string $techCardUrl, string $siteUrl, array $L, string $locale): string {
    $techCardBtn = '';
    if ($techCardUrl !== '') {
        $techCardBtn = '
          <a href="' . htmlspecialchars($techCardUrl) . '" target="_blank"
             style="display:inline-block;margin-top:16px;padding:12px 24px;background-color:#2563eb;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
            ' . $L['techCard'] . '
          </a>';
    }

    $content = '
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#0f172a;">' . $L['sampleTitle'] . '</h1>
      <p style="margin:0 0 12px;font-size:16px;color:#475569;line-height:26px;">
        ' . $L['greeting'] . ' <strong style="color:#0f172a;">' . htmlspecialchars($name) . '</strong>,
      </p>
      <p style="margin:0 0 24px;font-size:16px;color:#475569;line-height:26px;">
        ' . $L['sampleBody'] . '
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
             style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;margin-bottom:24px;">
        <tr>
          <td style="padding:20px 24px;">
            <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">' . $L['productLabel'] . '</p>
            <p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#0f172a;">' . htmlspecialchars($productName) . '</p>
            ' . $techCardBtn . '
          </td>
        </tr>
      </table>

      <p style="margin:0;font-size:16px;color:#475569;line-height:26px;">
        ' . $L['regards'] . '<br>
        <strong style="color:#0f172a;">' . $L['team'] . '</strong>
      </p>';

    return emailLayout($content, $siteUrl, $L, $locale);
}
