<?php
// автоматически определяем протокол и хост




// File: /var/www/html/key/config.php

// 1) Database connection settings — заполните под свою базу
$DB_HOST = '127.0.0.1';
$DB_PORT = '3306';               // обычно 3306
$DB_NAME = 'y62577_key';         // имя базы, которую вы создали
$DB_USER = 'y62577_key';         // пользователь БД
$DB_PASS = 'QaZxSw!2#';          // его пароль

// автоматически определяем протокол и хост
$proto = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS']!=='off') ? 'https' : 'http';
define('BASE_URL', $proto.'://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['SCRIPT_NAME']));

// или жёстко, если хотите всегда https и конкретный путь:
// define('BASE_URL', 'https://key.surgetheme.com/key');

// 2) Admin credentials for the web UI
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'YourAdminPass123');  // задайте свой пароль
define('ASSETS_DIR', '/var/key_assets');

// 3) Создаём PDO
$dsn = "mysql:host={$DB_HOST};port={$DB_PORT};dbname={$DB_NAME};charset=utf8mb4";
try {
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}
