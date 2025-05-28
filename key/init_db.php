<?php
// File: init_db.php
// Creates/updates licenses, users, asset_files tables
// Seeds initial admin user and scans /assets folder.

require __DIR__ . '/config.php'; 
// config.php должен определять: 
//   $DB_HOST, $DB_PORT, $DB_NAME, $DB_USER, $DB_PASS, 
//   ADMIN_USER, ADMIN_PASS

try {
    // Connect to MySQL via PDO
    $dsn = "mysql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME;charset=utf8mb4";
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    echo "✔ Connected to `$DB_NAME`" . PHP_EOL;
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// --- 1) licenses table ---
$sql = <<<'SQL'
CREATE TABLE IF NOT EXISTS `licenses` (
  `code`           VARCHAR(16)   NOT NULL,
  `created_at`     DATETIME      NOT NULL,
  `expires_at`     DATETIME      NULL,
  `allowed_domain` VARCHAR(255)  NULL,
  `used`           TINYINT(1)    NOT NULL DEFAULT 0,
  `active`         TINYINT(1)    NOT NULL DEFAULT 1,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB CHARSET=utf8mb4;
SQL;
$pdo->exec($sql);
echo "✔ licenses table ready." . PHP_EOL;

// --- 2) users table ---
$sql = <<<'SQL'
CREATE TABLE IF NOT EXISTS `users` (
  `id`         INT           NOT NULL AUTO_INCREMENT,
  `username`   VARCHAR(64)   NOT NULL UNIQUE,
  `password`   VARCHAR(255)  NOT NULL,
  `created_at` DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8mb4;
SQL;
$pdo->exec($sql);
echo "✔ users table ready." . PHP_EOL;

// --- 3) asset_files table ---
$sql = <<<'SQL'
CREATE TABLE IF NOT EXISTS `asset_files` (
  `filename` VARCHAR(255) NOT NULL,
  `active`   TINYINT(1)   NOT NULL DEFAULT 1,
  PRIMARY KEY (`filename`)
) ENGINE=InnoDB CHARSET=utf8mb4;
SQL;
$pdo->exec($sql);
echo "✔ asset_files table ready." . PHP_EOL;

// --- 4) Seed initial admin user ---
$hash = password_hash(ADMIN_PASS, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("
  INSERT IGNORE INTO users (username,password)
  VALUES (:u,:p)
");
$stmt->execute([
    ':u' => ADMIN_USER,
    ':p' => $hash
]);
echo "✔ Admin user '" . ADMIN_USER . "' in place." . PHP_EOL;

// --- 5) Import all .js/.css from /assets into asset_files ---
$dir = __DIR__ . '/assets';
if (is_dir($dir)) {
    $files = array_diff(scandir($dir), ['.','..']);
    $stmt = $pdo->prepare("
      INSERT IGNORE INTO asset_files (filename)
      VALUES (:f)
    ");
    foreach ($files as $f) {
        $ext = pathinfo($f, PATHINFO_EXTENSION);
        if (in_array($ext, ['js','css'], true)) {
            $stmt->execute([':f' => $f]);
        }
    }
    echo "✔ asset_files seeded from assets/ directory." . PHP_EOL;
}

echo "✔ init_db.php completed." . PHP_EOL;
