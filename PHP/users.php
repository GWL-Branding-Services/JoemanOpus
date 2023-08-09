<?php
 
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Content-Type: application/json");

require 'server.php';

$sql = "SELECT * FROM users";
$result = mysqli_query($db_conn, $sql);

if (!$result) {
    echo json_encode(['status' => false, 'message' => 'Failed to retrieve data']);
    mysqli_close($db_conn);
    exit();
}
 
$json_data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $users = array(
        'user_id' => $row['user_id'],
        'first_name' => $row['first_name'],
        'last_name' => $row['last_name'],
        'phone_number' => $row['number'],
        'role' => $row['role'],
        'subscription' => $row['subscription'], 
        'verification_status' => $row['verification_status'], 
    );
    $json_data[] = $users;
}

mysqli_close($db_conn);

$response = ['status' => true,  'message' => 'Showing Data', 'users' => $json_data];
echo json_encode($response);
