<?php
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Content-Type: application/json");
require 'server.php';
// Check if all required fields are provided
$required_fields = ['customername', 'customeremail', 'customerphonenumber', 'customerproduct', 'totalAmountPaid'];
if (count(array_diff($required_fields, array_keys($_POST))) > 0) {
    echo json_encode(['status' => false, 'message' => 'Please fill all the required fields']);
    exit();
}

$name = $_POST['customername'];
$email = $_POST['customeremail'];
$phonenumber = $_POST['customerphonenumber'];
$products = $_POST['customerproduct'];
$totalAmount = $_POST['totalAmountPaid'];
$date = date("Y-m-d h:m:s");
// $date = date("Y-m-d");


// Use prepared statement to insert data into the database
$stmt = $db_conn->prepare("INSERT INTO customers (name, email, phone_number, date, products, total ) VALUES (?, ?, ?, ?, ?, ? )");
$stmt->bind_param("ssssss", $name, $email, $phonenumber, $date, $products, $totalAmount);
$add = $stmt->execute();

if ($add) {
    echo json_encode(['status' => true, 'message' => 'Customer Created Successfully.']);
} else {
    // Get the specific database error message
    echo json_encode(['status' => false, 'message' => 'Database Error: ' . $stmt->error]);
}
?>