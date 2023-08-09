<?php
 
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Content-Type: application/json");
require 'server.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->productID) && !empty(trim($data->productID))) {
    $productID = mysqli_real_escape_string($db_conn, trim($data->productID));
    $add = mysqli_query($db_conn, "DELETE FROM products WHERE products_id ='$productID'");
    if ($add) {
        echo json_encode(["status" => true, "message" => "Product deleted successfully."]);
        return;
    } else {
        echo json_encode(["status" => false, "message" => "Server Problem"]);
        return;
    }
} else {
    echo json_encode(["status" => false, "message" => "Please fill all the required fields"]);
    return;
}


 
?>