<?php
session_start();

// If user not logged in, block
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'msg' => 'Not logged in']);
    exit;
}

$host = "localhost";
$user = "root";
$pass = "";
$db   = "footykit";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'msg' => 'DB connection failed']));
}

$action  = $_POST['action'] ?? '';
$user_id = $_SESSION['user_id'];

// ✅ Add to cart
if ($action === 'add') {
    $product_id     = intval($_POST['product_id']);
    $size           = $conn->real_escape_string($_POST['size']);
    $quantity       = intval($_POST['quantity']);
    $price          = floatval($_POST['price']); // unit price from frontend
    $selected_image = $conn->real_escape_string($_POST['selected_image'] ?? ''); // New: Get selected image

    // Check if same product+size exists
    $check = $conn->query("SELECT id, quantity FROM cart WHERE user_id='$user_id' AND product_id='$product_id' AND size='$size' AND selected_image_url='$selected_image'"); // Include selected_image_url in check
    if ($check->num_rows > 0) {
        $row = $check->fetch_assoc();
        $newQty = $row['quantity'] + $quantity;
        $conn->query("UPDATE cart SET quantity='$newQty' WHERE id=".$row['id']);
    } else {
        $stmt = $conn->prepare("INSERT INTO cart (user_id, product_id, size, quantity, price, selected_image_url, added_at) VALUES (?,?,?,?,?,?,NOW())");
        $stmt->bind_param("iisids", $user_id, $product_id, $size, $quantity, $price, $selected_image); // Add selected_image_url to bind_param
        $stmt->execute();
    }

    echo json_encode(['status'=>'success','msg'=>'Added to cart']);
}

// ✅ View cart
elseif ($action === 'view') {
    $items = [];
    $sql = "SELECT c.id, c.product_id, c.size, c.quantity, c.price, c.selected_image_url, p.name, p.brand, p.image 
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id='$user_id'";
    $result = $conn->query($sql);
    while($row = $result->fetch_assoc()) {
        $items[] = [
            "id"             => $row['id'],
            "product_id"     => $row['product_id'],
            "name"           => $row['name'],
            "brand"          => $row['brand'],
            "size"           => $row['size'],
            "quantity"       => $row['quantity'],
            "price"          => $row['price'],
            "image"          => $row['image'] ?? "img/products/f1.jpg", // Default image from products table
            "selected_image" => $row['selected_image_url'] // The image specifically chosen by the user
        ];
    }
    echo json_encode(['status'=>'success','items'=>$items]);
}

// ✅ Remove from cart
elseif ($action === 'remove') {
    $cart_id = intval($_POST['id']);
    $conn->query("DELETE FROM cart WHERE id='$cart_id' AND user_id='$user_id'");
    echo json_encode(['status'=>'success','msg'=>'Item removed']);
}

// ✅ Update quantity
elseif ($action === 'update') {
    $id       = intval($_POST['id']);
    $quantity = intval($_POST['quantity']);
    $conn->query("UPDATE cart SET quantity='$quantity' WHERE id='$id' AND user_id='$user_id'");
    echo json_encode(['status'=>'success','msg'=>'Cart updated']);
}

// ✅ Get cart total
elseif ($action === 'get_total') {
    $total = 0;
    $sql = "SELECT SUM(quantity * price) AS subtotal FROM cart WHERE user_id='$user_id'";
    $result = $conn->query($sql);
    if ($result) {
        $row = $result->fetch_assoc();
        $total = $row['subtotal'] ?? 0;
    }
    echo json_encode(['status' => 'success', 'total' => $total]);
}

$conn->close();