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

// Check if token and password are provided
if (isset($_POST['token']) && isset($_POST['password'])) {
    $token = $_POST['token'];
    $password = $_POST['password'];

    // Retrieve user from the database based on the token
    $sql = "SELECT * FROM users WHERE reset_token = '$token'";
    $result = $db_conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $expiration = $row['reset_expiration'];

        // Verify token expiration
        $currentTimestamp = time();
        if ($currentTimestamp <= strtotime($expiration)) {
            // Update password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $userId = $row['user_id'];
            $updateSql = "UPDATE users SET password = '$hashedPassword', reset_token = NULL, reset_expiration = NULL WHERE user_id = $userId";
            if ($db_conn->query($updateSql) === TRUE) {
                // Password updated successfully
                $response = array(
                    'status' => true,
                    'message' => 'Password changed successfully!'
                );
            } else {
                // Error updating password
                $response = array(
                    'status' => false,
                    'message' => 'Error updating password.'
                );
            }
        } else {
            // Token has expired
            $response = array(
                'status' => false,
                'message' => 'Token has expired.'
            );
        }
    } else {
        // Invalid token
        $response = array(
            'status' => false,
            'message' => 'Invalid token.'
        );
    }
} else {
    // Invalid request, token or password not provided
    $response = array(
        'status' => false,
        'message' => 'Invalid request. Token or password not provided.'
    );
}

// Return the JSON response
header('Content-Type: application/json');
echo json_encode($response);

$db_conn->close();
?>
