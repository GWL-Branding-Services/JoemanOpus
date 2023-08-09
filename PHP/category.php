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

$sql = "SELECT * FROM products_category";
$result = mysqli_query($db_conn, $sql);

if (!$result) {
    echo json_encode(['status' => false, 'message' => 'Failed to retrieve data']);
    mysqli_close($db_conn);
    exit();
}

$json_data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $category = array(
        'category_id' => $row['category_id'],
        'category' => $row['category'], 
    );
    $json_data[] = $category;
}

mysqli_close($db_conn);

$response = ['status' => true,  'message' => 'Showing Data', 'category' => $json_data];
echo json_encode($response);
