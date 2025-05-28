<?php
// File: unlock.js — PHP script that outputs JS to inject your Shopify theme assets.
// Place this at https://0088.co.uk/key/unlock.js and ensure your web server parses it as PHP.

// IMPORTANT: Define SERVER_SECRET in config.php, e.g.:
//   define('SERVER_SECRET', 'your_strong_hmac_secret');

require __DIR__ . '/config.php';

// 1) Send proper headers
header('Content-Type: application/javascript');
header('Access-Control-Allow-Origin: https://0088.co.uk');

// 2) Read query parameters
$code = isset($_GET['code']) ? strtoupper(trim($_GET['code'])) : '';
$ts   = isset($_GET['ts'])   ? intval($_GET['ts'])         : 0;
$sig  = isset($_GET['sig'])  ? $_GET['sig']                 : '';

// 3) Reject if timestamp is older/newer than 5 minutes
if (abs(time() - $ts) > 300) {
    http_response_code(403);
    exit;
}

// 4) Verify HMAC signature: SERVER_SECRET signs "$code|$ts"
if (!defined('SERVER_SECRET') || hash_hmac('sha256', "$code|$ts", SERVER_SECRET) !== $sig) {
    http_response_code(403);
    exit;
}

// 5) Validate license in database (active, not expired)
$stmt = $pdo->prepare("
    SELECT expires_at
      FROM licenses
     WHERE code = :code
       AND active = 1
");
$stmt->execute([':code' => $code]);
$lic = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$lic || ($lic['expires_at'] && strtotime($lic['expires_at']) < time())) {
    http_response_code(403);
    exit;
}

// 6) License is valid → output JS that loads your theme assets
echo <<<JS
(function() {
  // 6a) Inject your theme's CSS
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.shopify.com/s/files/YOUR_THEME_CSS_URL.css'; // ← replace with your real theme.css URL
  document.head.appendChild(link);

  // 6b) Inject your theme's main JavaScript
  var script = document.createElement('script');
  script.src = 'https://cdn.shopify.com/s/files/YOUR_THEME_JS_URL.js'; // ← replace with your real theme.js URL
  document.body.appendChild(script);
})();
JS;
