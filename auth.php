<?php
session_start();

$host = "localhost";
$user = "root";
$pass = "";
$db   = "footykit";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'msg' => 'DB connection failed']));
}

$action = $_POST['action'] ?? '';

if ($action === 'register') {
    $username = $conn->real_escape_string($_POST['username']);
    $email    = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $check = $conn->query("SELECT id FROM users WHERE email='$email'");
    if ($check->num_rows > 0) {
        echo json_encode(['status' => 'error', 'msg' => 'Email already registered']);
        exit;
    }

    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
    if ($conn->query($sql)) {
        echo json_encode(['status' => 'success', 'msg' => 'Registration successful']);
    } else {
        echo json_encode(['status' => 'error', 'msg' => 'Registration failed']);
    }
}

elseif ($action === 'login') {
    $email    = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email='$email' LIMIT 1";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            echo json_encode(['status' => 'success', 'msg' => 'Login successful', 'username' => $user['username']]);
        } else {
            echo json_encode(['status' => 'error', 'msg' => 'Invalid password']);
        }
    } else {
        echo json_encode(['status' => 'error', 'msg' => 'User not found']);
    }
}

elseif ($action === 'logout') {
    session_destroy();
    echo json_encode(['status' => 'success', 'msg' => 'Logged out']);
}

elseif ($action === 'check') {
    if (isset($_SESSION['user_id'])) {
        echo json_encode([
            'status' => 'loggedin',
            'username' => $_SESSION['username']
        ]);
    } else {
        echo json_encode(['status' => 'loggedout']);
    }
}

else {
    echo json_encode(['status' => 'error', 'msg' => 'Invalid action']);
}

$conn->close();
