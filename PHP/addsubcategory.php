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

if (isset($_POST['categoryname'] , $_POST['subcategoryname'])) {
    $category = $_POST['categoryname'];
    $sub_category = $_POST['subcategoryname'];

    // Use prepared statement to insert data into the database
    $stmt = $db_conn->prepare("INSERT INTO sub_category (category, sub_category) VALUES (?, ?)");
    $stmt->bind_param("ss", $category, $sub_category);
    $add = $stmt->execute();

    if ($add) {
        echo json_encode(["status" => true, "message" => "Sub-category Created Successfully."]);
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
