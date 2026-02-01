<?php
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

$to = "biuro@grassit.pl";
$subject = $data['subject'] ?? "Wiadomość ze strony Grassit";
$p = $data['payload'] ?? [];
$messageBody = "";
$siteUrl = "https://grassit.pl";

$isSampleOrder = isset($p['street']) && isset($p['city']);

// =========================================================================
//  1. Mail do biura (plain text — jak dotychczas)
// =========================================================================
if ($isSampleOrder) {
    $subject = "ZAMÓWIENIE PRÓBKI: " . ($p['productName'] ?? 'Brak nazwy');
    $messageBody .= "ZAMÓWIENIE PRÓBKI\n\n";
    $messageBody .= "Produkt: " . ($p['productName'] ?? '-') . "\n";
    $messageBody .= "ID: " . ($p['productId'] ?? '-') . "\n";
    $messageBody .= "Imię i nazwisko: " . ($p['name'] ?? '-') . " " . ($p['lastName'] ?? '-') . "\n";
    $messageBody .= "Email: " . ($p['email'] ?? '-') . "\n";
    $messageBody .= "Telefon: " . ($p['phoneNumber'] ?? '-') . "\n";
    $messageBody .= "Adres: " . ($p['street'] ?? '-') . ", " . ($p['zip'] ?? '-') . " " . ($p['city'] ?? '-') . "\n";
    $messageBody .= "Firma: " . ($p['company'] ?? '-') . "\n";
    $messageBody .= "NIP: " . ($p['nip'] ?? '-') . "\n";
    $messageBody .= "Uwagi: " . ($p['notes'] ?? '-') . "\n";
} else {
    $subject = "KONTAKT WWW: " . ($p['name'] ?? 'Gość');
    $messageBody .= "WIADOMOŚĆ Z FORMULARZA KONTAKTOWEGO\n\n";
    $messageBody .= "Imię i nazwisko: " . ($p['name'] ?? '-') . " " . ($p['lastName'] ?? '-') . "\n";
    $messageBody .= "Email: " . ($p['email'] ?? '-') . "\n";
    $messageBody .= "Telefon: " . ($p['phoneNumber'] ?? '-') . "\n";
    $messageBody .= "Wiadomość: \n" . ($p['message'] ?? '-') . "\n";
}

$adminHeaders  = "From: Formularz Grassit <noreply@grassit.pl>\r\n";
$adminHeaders .= "Reply-To: " . ($p['email'] ?? 'biuro@grassit.pl') . "\r\n";
$adminHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

$adminOk = mail($to, $subject, $messageBody, $adminHeaders);

// =========================================================================
//  2. Mail do klienta (HTML template)
// =========================================================================
$customerOk = true;
$customerEmail = $p['email'] ?? null;

if ($customerEmail) {
    $customerName = trim(($p['name'] ?? '') . ' ' . ($p['lastName'] ?? ''));
    if ($customerName === '') $customerName = 'Kliencie';

    if ($isSampleOrder) {
        $productName = $p['productName'] ?? '-';

        // Karta techniczna — konwencja: /static/pdf/{id_lowercase}.pdf
        $techCardUrl = '';
        if (!empty($p['productId'])) {
            $techCardUrl = $siteUrl . '/static/pdf/' . strtolower($p['productId']) . '.pdf';
        }

        $customerSubject = "Grassit — potwierdzenie zamówienia próbki: " . $productName;
        $customerBody = buildSampleOrderTemplate($customerName, $productName, $techCardUrl, $siteUrl);
    } else {
        $customerSubject = "Grassit — dziękujemy za kontakt!";
        $customerBody = buildContactTemplate($customerName, $siteUrl);
    }

    $customerHeaders  = "From: Grassit <noreply@grassit.pl>\r\n";
    $customerHeaders .= "MIME-Version: 1.0\r\n";
    $customerHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";

    $customerOk = mail($customerEmail, $customerSubject, $customerBody, $customerHeaders);
}

// =========================================================================
//  Odpowiedź
// =========================================================================
if ($adminOk) {
    echo json_encode(["ok" => true]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "Mail sending failed"]);
}

// =========================================================================
//  SZABLONY HTML
// =========================================================================

function emailLayout(string $content, string $siteUrl): string {
    $year = date('Y');

    return '<!DOCTYPE html>
<html lang="pl">
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
            32-400 Myślenice, Polska<br>
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
        &copy; ' . $year . ' Grassit. Wszelkie prawa zastrzeżone.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>';
}

// ---- Kontakt ----
function buildContactTemplate(string $name, string $siteUrl): string {
    $content = '
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#0f172a;">Dziękujemy za kontakt!</h1>
      <p style="margin:0 0 12px;font-size:16px;color:#475569;line-height:26px;">
        Cześć <strong style="color:#0f172a;">' . htmlspecialchars($name) . '</strong>,
      </p>
      <p style="margin:0 0 24px;font-size:16px;color:#475569;line-height:26px;">
        Otrzymaliśmy Twoją wiadomość. Nasz zespół odpowie w ciągu kilku dni roboczych.
        Jeżeli potrzebujesz pilnej informacji, zapraszamy do kontaktu telefonicznego
        pod numerem <strong style="color:#0f172a;">+48 515 401 178</strong>.
      </p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
      <p style="margin:0;font-size:16px;color:#475569;line-height:26px;">
        Pozdrawiamy,<br>
        <strong style="color:#0f172a;">Zespół Grassit</strong>
      </p>';

    return emailLayout($content, $siteUrl);
}

// ---- Zamówienie próbki ----
function buildSampleOrderTemplate(string $name, string $productName, string $techCardUrl, string $siteUrl): string {
    $techCardBtn = '';
    if ($techCardUrl !== '') {
        $techCardBtn = '
          <a href="' . htmlspecialchars($techCardUrl) . '" target="_blank"
             style="display:inline-block;margin-top:16px;padding:12px 24px;background-color:#2563eb;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
            Pobierz kartę techniczną (PDF)
          </a>';
    }

    $content = '
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#0f172a;">Dziękujemy za zamówienie próbki!</h1>
      <p style="margin:0 0 12px;font-size:16px;color:#475569;line-height:26px;">
        Cześć <strong style="color:#0f172a;">' . htmlspecialchars($name) . '</strong>,
      </p>
      <p style="margin:0 0 24px;font-size:16px;color:#475569;line-height:26px;">
        Otrzymaliśmy Twoje zapytanie dotyczące próbki produktu. Nasz zespół
        skontaktuje się z Tobą w celu potwierdzenia zamówienia.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
             style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;margin-bottom:24px;">
        <tr>
          <td style="padding:20px 24px;">
            <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Produkt</p>
            <p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#0f172a;">' . htmlspecialchars($productName) . '</p>
            ' . $techCardBtn . '
          </td>
        </tr>
      </table>

      <p style="margin:0;font-size:16px;color:#475569;line-height:26px;">
        Pozdrawiamy,<br>
        <strong style="color:#0f172a;">Zespół Grassit</strong>
      </p>';

    return emailLayout($content, $siteUrl);
}
?>
