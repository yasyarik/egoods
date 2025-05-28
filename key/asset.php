<?php
declare(strict_types=1);
ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS для Shopify редактора
header('Access-Control-Allow-Origin: https://cw-theme-test.myshopify.com');
header('Access-Control-Allow-Methods: GET, HEAD, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'HEAD') {
  http_response_code(200);
  exit;
}

require __DIR__ . '/config.php';

$codeRaw = $_GET['code'] ?? '';
$fileRaw = $_GET['file'] ?? '';

if (!preg_match('/^[A-Za-z0-9]{1,16}$/', $codeRaw)) {
  header('HTTP/1.1 400 Bad Request');
  exit('Invalid license code');
}

$filename = basename($fileRaw);
if (!preg_match('/^[A-Za-z0-9_.-]+\.(js|css)$/', $filename)) {
  header('HTTP/1.1 400 Bad Request');
  exit('Invalid file name');
}

// Проверка лицензии
$stmt = $pdo->prepare("SELECT code, active, expires_at FROM licenses WHERE code = :code LIMIT 1");
$stmt->execute([':code' => $codeRaw]);
$lic = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$lic || !(int)$lic['active']) {
  header('HTTP/1.1 403 Forbidden');
  exit('License inactive or not found');
}

if ($lic['expires_at'] !== null) {
  $expires = new DateTime($lic['expires_at']);
  if (new DateTime() > $expires) {
    header('HTTP/1.1 403 Forbidden');
    exit('License expired');
  }
}

// Отдача файла
$path = '/var/key_assets/' . $filename;
if (!is_file($path)) {
  header('HTTP/1.1 404 Not Found');
  exit('File not found');
}

$ext = pathinfo($filename, PATHINFO_EXTENSION);
$types = [
  'js' => 'application/javascript',
  'css' => 'text/css'
];

header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));
header('Cache-Control: public, max-age=3600');
readfile($path);
exit;
