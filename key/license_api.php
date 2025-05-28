<?php
// File: license_api.php
// Endpoint для проверки лицензии из Shopify theme

// 0) Отключаем вывод PHP-ошибок, чтобы не ломать JSON
ini_set('display_errors', 0);
error_reporting(0);

// 1) Обрабатываем preflight-запросы CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Разрешаем GET и OPTIONS и заголовок Content-Type
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    // Если Origin есть — echo его, иначе любому
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
    header("Access-Control-Allow-Origin: {$origin}");
    exit;
}

// 2) Подключаем конфиг (здесь настраивается PDO и константы)
require __DIR__ . '/config.php';

// 3) Готовим ответ как JSON
header('Content-Type: application/json');

// 4) Получаем код license из GET-параметра
$code = isset($_GET['code']) ? strtoupper(trim($_GET['code'])) : '';

// Если код пустой — возвращаем 400
if ($code === '') {
    http_response_code(400);
    echo json_encode(['valid' => false, 'reason' => 'empty_code']);
    exit;
}

// 5) Ищем в таблице licenses запись с этим кодом и active=1
$stmt = $pdo->prepare("
    SELECT code, used, active, expires_at, allowed_domain
      FROM licenses
     WHERE code = :code
       AND active = 1
     LIMIT 1
");
$stmt->execute([':code' => $code]);
$lic = $stmt->fetch(PDO::FETCH_ASSOC);

// Если не нашли или inactive
if (!$lic) {
    echo json_encode(['valid' => false, 'reason' => 'unknown_or_disabled']);
    exit;
}

// 6) Проверяем срок действия
if ($lic['expires_at'] !== null && strtotime($lic['expires_at']) < time()) {
    echo json_encode(['valid' => false, 'reason' => 'expired']);
    exit;
}

// 7) CORS: проверяем Origin только если в админке указан allowed_domain
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($lic['allowed_domain']) {
    // сравниваем host из Origin с allowed_domain
    $originHost = parse_url($origin, PHP_URL_HOST);
    if ($originHost !== $lic['allowed_domain']) {
        echo json_encode(['valid' => false, 'reason' => 'domain_mismatch']);
        exit;
    }
    // Разрешаем CORS только для Origin
    header("Access-Control-Allow-Origin: {$origin}");
} else {
    // Если ограничений нет — разрешаем всем
    header('Access-Control-Allow-Origin: *');
}

// 8) Помечаем этот код как “used” (только при первом успешном запросе)
if (!(int)$lic['used']) {
    $upd = $pdo->prepare("UPDATE licenses SET used = 1 WHERE code = :code");
    $upd->execute([':code' => $code]);
}

// 9) Всё ок — возвращаем валидный ответ
echo json_encode(['valid' => true]);
exit;
