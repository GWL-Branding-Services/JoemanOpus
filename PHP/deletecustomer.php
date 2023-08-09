<?php
 
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Content-Type: application/json");
require 'server.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->customerID) && !empty(trim($data->customerID))) {
    $customerID = mysqli_real_escape_string($db_conn, trim($data->customerID));
    $add = mysqli_query($db_conn, "DELETE FROM customers WHERE customer_id ='$customerID'");
    if ($add) {
        echo json_encode(["status" => true, "message" => "Customer deleted successfully."]);
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