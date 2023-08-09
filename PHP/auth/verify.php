<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}

require '../server.php';

if (isset($_GET['token'])) {
    $verificationToken = $_GET['token'];

    // Retrieve user from the database based on verification token
    $sql = "SELECT * FROM users WHERE verification_token = '$verificationToken'";
    $result = $db_conn->query($sql);

    if ($result->num_rows > 0) {
        // User with matching verification token found
        // Update the verification status and clear the verification token
        $sqlUpdateUser = "UPDATE users SET verification_status = 1, verification_token = NULL WHERE verification_token = '$verificationToken'";
        $db_conn->query($sqlUpdateUser);

        // Return success response
        $response = array(
            'status' => true,
            'message' => 'Email verification successful!'
        );
        http_response_code(200);
        echo json_encode($response);
    } else {
        // No user found with the verification token
        // Return error response
        $response = array(
            'status' => false,
            'message' => 'Invalid verification token.'
        );
        http_response_code(400);
        echo json_encode($response);
    }
} else {
    // Invalid request, token not provided
    $response = array(
        'status' => false,
        'message' => 'Invalid request. Token not provided.'
    );
    http_response_code(400);
    echo json_encode($response);
}

// Close the database connection
$db_conn->close();
?>
