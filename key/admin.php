<?php
// File: admin.php
// Admin Panel with three tabs: Licenses, Users, Assets (including asset upload)

require __DIR__ . '/config.php'; // loads $pdo, BASE_URL, optional ASSETS_DIR

// 1) Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// 1.a) Handle logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_destroy();
    header('Location: ' . BASE_URL . '/admin.php');
    exit;
}

// Unified assets directory
$assetsDir = defined('ASSETS_DIR')
    ? rtrim(ASSETS_DIR, '/\\')
    : __DIR__ . '/assets';

// 2) Handle login
if (!isset($_SESSION['user'])) {
    $error = '';
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'login') {
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';
        $stmt = $pdo->prepare("SELECT password FROM users WHERE username = :u");
        $stmt->execute([':u' => $username]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row && password_verify($password, $row['password'])) {
            $_SESSION['user'] = $username;
            header('Location: ' . BASE_URL . '/admin.php');
            exit;
        }
        $error = 'Invalid credentials.';
    }
    // Render login form
    echo <<<HTML
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Admin Login</title>
  <style>
    body { background:#f0f2f5; font-family:sans-serif; }
    .login-box { max-width:360px; margin:100px auto; padding:20px; background:#fff;
                 border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.1); }
    .login-box h2 { margin-bottom:20px; }
    .login-box input, .login-box button {
      width:100%; padding:10px; margin:8px 0; border:1px solid #ccc; border-radius:4px;
    }
    .login-box button { background:#007bff; color:#fff; border:none; cursor:pointer; }
    .error { color:red; font-size:14px; }
  </style>
</head>
<body>
  <div class="login-box">
    <h2>Admin Login</h2>
    <form method="post">
      <input type="hidden" name="action" value="login">
      <input name="username"    type="text"     placeholder="Username" required>
      <input name="password"    type="password" placeholder="Password" required>
      <div class="error">{$error}</div>
      <button type="submit">Log In</button>
    </form>
  </div>
</body>
</html>
HTML;
    exit;
}

// 3) Determine active tab
$tab = $_GET['tab'] ?? 'licenses';
if (!in_array($tab, ['licenses','users','assets'], true)) {
    $tab = 'licenses';
}

// 4) Ensure the licenses folder exists
if (!is_dir(__DIR__ . '/licenses')) {
    mkdir(__DIR__ . '/licenses', 0755, true);
}

// 5) Function to build per-license loader script
function buildLicenseScript(string $code, ?string $domain): string {
    global $pdo;
    $base = BASE_URL . '/asset.php?code=' . $code . '&file=';
    $cssFiles = [];
    $jsFiles  = [];
    foreach ($pdo->query("SELECT filename FROM asset_files WHERE active=1") as $row) {
        $fn = $row['filename'];
        $ext = pathinfo($fn, PATHINFO_EXTENSION);
        if ($ext === 'css') {
            $cssFiles[] = $fn;
        } elseif ($ext === 'js') {
            $jsFiles[] = $fn;
        }
    }
    $js  = "(function(){\n";
    $js .= "  console.log('License loader for {$code}');\n";
    if ($domain) {
        $js .= "  // domain restriction: {$domain}\n";
    }
    foreach ($cssFiles as $f) {
        $js .= "  var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = '{$base}{$f}'; document.head.appendChild(l);\n";
    }
    foreach ($jsFiles as $f) {
        $js .= "  var s = document.createElement('script'); s.src = '{$base}{$f}'; document.body.appendChild(s);\n";
    }
    $js .= "  var root = document.getElementById('theme-root'); if (root) root.classList.remove('locked');\n";
    $js .= "})();\n";
    return $js;
}

// 6) Handle POST actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $code   = $_POST['code']   ?? '';

    // --- License actions ---
    if ($action === 'generate') {
        $code = strtoupper(bin2hex(random_bytes(4)));
        $expiresAt = !empty($_POST['expires_at'])
            ? date('Y-m-d H:i:s', strtotime($_POST['expires_at']))
            : null;
        $domain = trim($_POST['allowed_domain'] ?? '');
        $domain = $domain === '' ? null : rtrim(preg_replace('#^https?://#', '', $domain), '/');
        $stmt = $pdo->prepare(
            "INSERT INTO licenses (code, created_at, expires_at, allowed_domain) VALUES (:code, NOW(), :exp, :dom)"
        );
        $stmt->execute([':code' => $code, ':exp' => $expiresAt, ':dom' => $domain]);
        file_put_contents(__DIR__ . "/licenses/{$code}.js", buildLicenseScript($code, $domain));
        $_SESSION['success'] = "License {$code} generated.";
        header('Location: ' . BASE_URL . '/admin.php?tab=licenses');
        exit;

    } elseif ($action === 'toggle') {
        $pdo->prepare("UPDATE licenses SET active = 1 - active WHERE code = :code")
            ->execute([':code' => $code]);
        $r = $pdo->prepare("SELECT active, allowed_domain FROM licenses WHERE code = :code");
        $r->execute([':code' => $code]);
        $row = $r->fetch(PDO::FETCH_ASSOC);
        $path = __DIR__ . "/licenses/{$code}.js";
        if ($row['active']) {
            file_put_contents($path, buildLicenseScript($code, $row['allowed_domain']));
            $_SESSION['success'] = "License {$code} enabled.";
        } else {
            @unlink($path);
            $_SESSION['success'] = "License {$code} disabled.";
        }
        header('Location: ' . BASE_URL . '/admin.php?tab=licenses');
        exit;

    } elseif (in_array($action, ['update_expiry', 'update_domain'], true)) {
        $sets = []; $params = [':code' => $code];
        if ($action === 'update_expiry') {
            $newExp = !empty($_POST['expires_at'])
                ? date('Y-m-d H:i:s', strtotime($_POST['expires_at']))
                : null;
            $sets[] = 'expires_at = :exp';
            $params[':exp'] = $newExp;
        }
        if ($action === 'update_domain') {
            $dom = trim($_POST['allowed_domain'] ?? '');
            $dom = $dom === '' ? null : rtrim(preg_replace('#^https?://#', '', $dom), '/');
            $sets[] = 'allowed_domain = :dom';
            $params[':dom'] = $dom;
        }
        if ($sets) {
            $sql = "UPDATE licenses SET " . implode(', ', $sets) . " WHERE code = :code";
            $pdo->prepare($sql)->execute($params);
            $r = $pdo->prepare("SELECT active, allowed_domain FROM licenses WHERE code = :code");
            $r->execute([':code' => $code]);
            $row = $r->fetch(PDO::FETCH_ASSOC);
            if ($row['active']) {
                file_put_contents(__DIR__ . "/licenses/{$code}.js", buildLicenseScript($code, $row['allowed_domain']));
            }
            $_SESSION['success'] = "License {$code} updated.";
        }
        header('Location: ' . BASE_URL . '/admin.php?tab=licenses');
        exit;

    } elseif ($action === 'delete_license') {
        $pdo->prepare("DELETE FROM licenses WHERE code = :code")->execute([':code' => $code]);
        @unlink(__DIR__ . "/licenses/{$code}.js");
        $_SESSION['success'] = "License {$code} deleted.";
        header('Location: ' . BASE_URL . '/admin.php?tab=licenses');
        exit;
    }

    // --- User management actions ---
    elseif ($action === 'add_user') {
        $u = trim($_POST['new_username'] ?? '');
        $p = $_POST['new_password'] ?? '';
        if ($u && $p) {
            $h = password_hash($p, PASSWORD_DEFAULT);
            $pdo->prepare("INSERT INTO users (username, password) VALUES (:u, :p)")
                ->execute([':u' => $u, ':p' => $h]);
            $_SESSION['success'] = "User '{$u}' added.";
        }
        header('Location: ' . BASE_URL . '/admin.php?tab=users');
        exit;

    } elseif ($action === 'change_password') {
        $u = $_POST['username'] ?? '';
        $p = $_POST['password_new'] ?? '';
        if ($u && $p) {
            $h = password_hash($p, PASSWORD_DEFAULT);
            $pdo->prepare("UPDATE users SET password = :p WHERE username = :u")
                ->execute([':p' => $h, ':u' => $u]);
            $_SESSION['success'] = "Password for '{$u}' changed.";
        }
        header('Location: ' . BASE_URL . '/admin.php?tab=users');
        exit;

    } elseif ($action === 'delete_user') {
        $u = $_POST['username'] ?? '';
        if ($u) {
            $pdo->prepare("DELETE FROM users WHERE username = :u")->execute([':u' => $u]);
            $_SESSION['success'] = "User '{$u}' deleted.";
        }
        header('Location: ' . BASE_URL . '/admin.php?tab=users');
        exit;
    }

    // --- Asset management actions ---
    elseif ($action === 'upload_assets') {
        if (!is_dir($assetsDir)) {
            mkdir($assetsDir, 0755, true);
        }
        if (!empty($_FILES['upload_files'])) {
            foreach ($_FILES['upload_files']['error'] as $i => $err) {
                if ($err === UPLOAD_ERR_OK) {
                    $tmp  = $_FILES['upload_files']['tmp_name'][$i];
                    $name = basename($_FILES['upload_files']['name'][$i]);
                    if (preg_match('/\.(js|css)$/i', $name)) {
                        $dest = $assetsDir . DIRECTORY_SEPARATOR . $name;
                        if (move_uploaded_file($tmp, $dest)) {
                            $pdo->prepare("INSERT IGNORE INTO asset_files (filename) VALUES (:f)")
                                ->execute([':f' => $name]);
                        }
                    }
                }
            }
        }
        $_SESSION['success'] = 'Files uploaded.';
        header('Location: ' . BASE_URL . '/admin.php?tab=assets');
        exit;

    } elseif ($action === 'delete_asset') {
        $file = basename($_POST['filename'] ?? '');
        $full = $assetsDir . DIRECTORY_SEPARATOR . $file;
        if (!is_file($full)) {
            $_SESSION['error'] = "File '{$file}' not found.";
        } elseif (!is_writable($full)) {
            $_SESSION['error'] = "No permission to delete '{$file}'.";
        } else {
            if (unlink($full)) {
                $pdo->prepare("DELETE FROM asset_files WHERE filename = :f")
                    ->execute([':f' => $file]);
                $_SESSION['success'] = "File '{$file}' deleted.";
            } else {
                $_SESSION['error'] = "Error deleting '{$file}'.";
            }
        }
        header('Location: ' . BASE_URL . '/admin.php?tab=assets');
        exit;
    }
}

// 7) Fetch data for display
$licenses = $pdo->query("SELECT * FROM licenses ORDER BY created_at DESC")
                ->fetchAll(PDO::FETCH_ASSOC);
$users    = $pdo->query("SELECT username, created_at FROM users ORDER BY created_at DESC")
                ->fetchAll(PDO::FETCH_ASSOC);

// Scan assets directory
$assets = [];
if (is_dir($assetsDir)) {
    foreach (scandir($assetsDir) as $f) {
        if (!in_array($f, ['.', '..'], true) && preg_match('/\.(js|css)$/i', $f)) {
            $stmt = $pdo->prepare("SELECT active FROM asset_files WHERE filename = :f");
            $stmt->execute([':f' => $f]);
            $active = $stmt->fetchColumn();
            $assets[] = [
                'filename' => $f,
                'active'   => $active !== false ? (int)$active : 1,
                'size'     => filesize($assetsDir . '/' . $f),
            ];
        }
    }
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Admin Panel</title>
  <style>
    body{margin:0;padding:20px;font-family:Arial,sans-serif;background:#f5f7fa}
    h1{margin-bottom:10px;color:#333; display:inline-block}
    .logout{float:right;margin-top:16px}
    .tabs{clear:both;display:flex;border-bottom:2px solid #ccc;margin-bottom:20px}
    .tab{padding:10px 20px;cursor:pointer;background:#e0e0e0;
         border-top-left-radius:6px;border-top-right-radius:6px;
         margin-right:4px;text-decoration:none;color:#333}
    .tab.active{background:#fff;border-bottom:2px solid #fff;font-weight:bold}
    .section{background:#fff;padding:20px;border-radius:6px;
             box-shadow:0 1px 4px rgba(0,0,0,0.1);margin-bottom:20px}
    .section:not(.active){display:none}
    table{width:100%;border-collapse:collapse;margin-top:10px}
    th,td{padding:8px;text-align:center;border-bottom:1px solid #eee}
    th{background:#007bff;color:#fff}
    form.inline{display:inline-block;margin:0}
    input,button{padding:6px 8px;margin:0 4px 4px 0;border:1px solid #ccc;border-radius:4px}
    .btn{cursor:pointer}
    .btn-add{background:#28a745;color:#fff;border:none}
    .btn-toggle{background:#ffc107;color:#212529;border:none}
    .btn-delete{background:#dc3545;color:#fff;border:none}
    .btn-update{background:#17a2b8;color:#fff;border:none}
    input[type=date],input[type=text],input[type=password]{width:120px}
    .error{color:red;margin-bottom:10px}
    .success{color:green;margin-bottom:10px}
  </style>
</head>
<body>

  <h1>Admin Panel</h1>
  <a href="?action=logout" class="btn btn-delete logout">Logout</a>

  <!-- Flash messages -->
  <?php if (!empty($_SESSION['error'])): ?>
    <div class="error"><?php echo htmlspecialchars($_SESSION['error']); unset($_SESSION['error']); ?></div>
  <?php endif; ?>
  <?php if (!empty($_SESSION['success'])): ?>
    <div class="success"><?php echo htmlspecialchars($_SESSION['success']); unset($_SESSION['success']); ?></div>
  <?php endif; ?>

  <!-- Navigation Tabs -->
  <div class="tabs">
    <a href="?tab=licenses" class="tab <?= $tab==='licenses'?'active':'' ?>">Licenses</a>
    <a href="?tab=users"    class="tab <?= $tab==='users'   ?'active':'' ?>">Users</a>
    <a href="?tab=assets"   class="tab <?= $tab==='assets'  ?'active':'' ?>">Assets</a>
  </div>

  <!-- Licenses Section -->
  <div class="section <?= $tab==='licenses'?'active':'' ?>">
    <h2>Licenses</h2>
    <form method="post" class="inline">
      <input type="hidden" name="action" value="generate">
      <input type="date" name="expires_at" placeholder="Expires">
      <input type="text" name="allowed_domain" placeholder="Allowed domain">
      <button class="btn btn-add" type="submit">Generate Key</button>
    </form>
    <table>
      <tr>
        <th>Code</th><th>Created</th><th>Expires</th><th>Domain</th>
        <th>Used</th><th>Active</th><th>Actions</th>
      </tr>
      <?php foreach($licenses as $l): ?>
      <tr>
        <td><?=htmlspecialchars($l['code'])?></td>
        <td><?=$l['created_at']?></td>
        <td><?=$l['expires_at']?:'—'?></td>
        <td><?=htmlspecialchars($l['allowed_domain']?:'any')?></td>
        <td><?=$l['used']?'Yes':'No'?></td>
        <td><?=$l['active']?'Yes':'No'?></td>
        <td>
          <form method="post" class="inline">
            <input type="hidden" name="action" value="toggle">
            <input type="hidden" name="code"   value="<?=$l['code']?>">
            <button class="btn btn-toggle" type="submit">
              <?=$l['active']?'Disable':'Enable'?>
            </button>
          </form>
          <form method="post" class="inline">
            <input type="hidden" name="action" value="update_expiry">
            <input type="hidden" name="code"   value="<?=$l['code']?>">
            <input type="date" name="expires_at"
                   value="<?=$l['expires_at']?date('Y-m-d',strtotime($l['expires_at'])):''?>">
            <button class="btn btn-update" type="submit">Set Expiry</button>
          </form>
          <form method="post" class="inline">
            <input type="hidden" name="action" value="update_domain">
            <input type="hidden" name="code"   value="<?=$l['code']?>">
            <input type="text" name="allowed_domain"
                   placeholder="domain" value="<?=htmlspecialchars($l['allowed_domain'])?>">
            <button class="btn btn-update" type="submit">Set Domain</button>
          </form>
          <form method="post" class="inline"
                onsubmit="return confirm('Delete license <?=$l['code']?>?')">
            <input type="hidden" name="action" value="delete_license">
            <input type="hidden" name="code"   value="<?=$l['code']?>">
            <button class="btn btn-delete" type="submit">Delete</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
    </table>
  </div>

  <!-- Users Section -->
  <div class="section <?= $tab==='users'?'active':'' ?>">
    <h2>Users</h2>
    <form method="post" class="inline">
      <input type="hidden" name="action" value="add_user">
      <input name="new_username" placeholder="Username" required>
      <input name="new_password" type="password" placeholder="Password" required>
      <button class="btn btn-add" type="submit">Add User</button>
    </form>
    <table>
      <tr><th>Username</th><th>Created At</th><th>Actions</th></tr>
      <?php foreach($users as $u): ?>
      <tr>
        <td><?=htmlspecialchars($u['username'])?></td>
        <td><?=$u['created_at']?></td>
        <td>
          <form method="post" class="inline">
            <input type="hidden" name="action"   value="change_password">
            <input type="hidden" name="username" value="<?=htmlspecialchars($u['username'])?>">
            <input name="password_new" type="password" placeholder="New password" required>
            <button class="btn btn-update" type="submit">Change PW</button>
          </form>
          <form method="post" class="inline"
                onsubmit="return confirm('Delete user <?=$u['username']?>?')">
            <input type="hidden" name="action"   value="delete_user">
            <input type="hidden" name="username" value="<?=htmlspecialchars($u['username'])?>">
            <button class="btn btn-delete" type="submit">Delete</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
    </table>
  </div>
  
  <!-- Assets Section -->
  <div class="section <?= $tab==='assets' ? 'active' : '' ?>">
    <h2>Assets</h2>

    <!-- Upload form -->
    <form method="post" enctype="multipart/form-data" class="inline">
      <input type="hidden" name="action" value="upload_assets">
      <input type="file" name="upload_files[]" accept=".js,.css" multiple required>
      <button class="btn btn-add" type="submit">Upload</button>
    </form>

    <br><br>
    <table>
      <tr>
        <th>Filename</th>
        <th>Size</th>
        <th>Actions</th>
      </tr>
      <?php foreach ($assets as $a): ?>
      <tr>
        <td><?=htmlspecialchars($a['filename'])?></td>
        <td><?=round($a['size']/1024,2)?> KB</td>
        <td>
          <form method="post" class="inline" onsubmit="return confirm('Delete <?=htmlspecialchars($a['filename'])?>?')">
            <input type="hidden" name="action" value="delete_asset">
            <input type="hidden" name="filename" value="<?=htmlspecialchars($a['filename'])?>">
            <button class="btn btn-delete" type="submit">Delete</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
    </table>
  </div>

</body>
</html>
