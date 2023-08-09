<?php
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Origin: http://localhost:3030');
// header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
// header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
// header('Content-Type: application/json');

// // Handle preflight OPTIONS request
// $method = $_SERVER['REQUEST_METHOD'];
// if ($method == "OPTIONS") {
//     header('Access-Control-Allow-Origin: *');
//     header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
//     header("HTTP/1.1 200 OK");
//     die();
// }
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Content-Type: application/json");
require 'server.php';

require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['DB_HOST'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$database = $_ENV['DB_DATABASE'];

// Create a new MySQLi instance
$db_conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($db_conn->connect_error) {
    die('Database connection failed: ' . $db_conn->connect_error);
}

// Fetch products from the database
$sql = "SELECT * FROM products";
$result = mysqli_query($db_conn, $sql);

if (!$result) {
    echo json_encode(['status' => false, 'message' => 'Failed to retrieve data']);
    mysqli_close($db_conn);
    exit();
}

$json_data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $products = [
        'products_id' => $row['products_id'],
        'name' => $row['name'],
        'category' => $row['category'],
        'sub_category' => $row['sub_category'],
        'recent' => $row['recent'],
        'price' => $row['price'],
        'promo_price' => $row['promo_price'],
        'rating' => $row['rating'],
        'trending' => $row['trending'],
        'url' => $row['url'],
        'inStock' => $row['inStock'],
        'detail' => $row['detail'],
        'img' => $row['img'],
    ];
    $json_data[] = $products;
}

mysqli_close($db_conn);

$response = ['status' => true,  'message' => 'Showing Data', 'products' => $json_data];
echo json_encode($response);
?>
