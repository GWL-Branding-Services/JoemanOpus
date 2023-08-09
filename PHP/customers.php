<?php
 
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Content-Type: application/json");

require 'server.php';

$sql = "SELECT * FROM customers";
$result = mysqli_query($db_conn, $sql);

if (!$result) {
    echo json_encode(['status' => false, 'message' => 'Failed to retrieve data']);
    mysqli_close($db_conn);
    exit();
}
 
$json_data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $customers = array(
        'customer_id' => $row['customer_id'],
        'name' => $row['name'],
        'email' => $row['email'],
        'phone_number' => $row['phone_number'],
        'products' => $row['products'],
        'total' => $row['total'],
        'date' => $row['date'],
    );
    $json_data[] = $customers;
}

mysqli_close($db_conn);

$response = ['status' => true,  'message' => 'Showing Data', 'customers' => $json_data];
echo json_encode($response);
