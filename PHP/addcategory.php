<?php
// header('Access-Control-Allow-Origin: http://localhost:3030');
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: access");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// header("Access-Control-Allow-Methods: POST");
// header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Accept, X-Requested-With");
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Content-Type: application/json");
require 'server.php';

if (isset($_POST['categoryname'])) {
    $category = $_POST['categoryname'];

    // Use prepared statement to insert data into the database
    $stmt = $db_conn->prepare("INSERT INTO products_category (category) VALUES (?)");
    $stmt->bind_param("s", $category);
    $add = $stmt->execute();

    if ($add) {
        echo json_encode(["status" => true, "message" => "Category Created Successfully."]);
        return;
    } else {
        // Get the specific database error message
        echo json_encode(["status" => false, "message" => "Database Error: " . $stmt->error]);
        return;
    }
} else {
    echo json_encode(["status" => false, "message" => "Please fill all the required fields"]);
    return;
}
?>
