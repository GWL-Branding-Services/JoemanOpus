<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
$method = $_SERVER['REQUEST_METHOD'];
if ($method === "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}

require '../server.php';
require '../vendor/autoload.php'; // Load Composer's autoloader

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();


if ($method === 'POST') {
    // Check if the form is submitted
    $data = json_decode(file_get_contents('php://input'), true);

    // Retrieve the email address from the form
    $email = $data['email'];

    // Generate a random password reset token/code
    $token = bin2hex(random_bytes(32));

    // Set the expiration time for the token (e.g., 1 hour from now)
    $expiration = date('Y-m-d H:i:s', strtotime('+1 hour'));

    // Check if the email exists in the database
    $sqlCheckEmail = "SELECT * FROM users WHERE email = '$email'";
    $result = $db_conn->query($sqlCheckEmail);

    if ($result->num_rows > 0) {
        // Email exists, update the token and expiration time in the database
        $sqlUpdateToken = "UPDATE users SET reset_token = '$token', reset_expiration = '$expiration' WHERE email = '$email'";
        $db_conn->query($sqlUpdateToken);

        // Send the password reset email
        $mail = new PHPMailer(true); // Enable exceptions

        try {
            // Configure SMTP settings such as host, username, password, etc. 
            $mail->isSMTP();
            $mail->Host = $_ENV['MAIL_HOST']; // SMTP server
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['MAIL_USERNAME']; // SMTP username
            $mail->Password = $_ENV['MAIL_PASSWORD']; // SMTP password
            $mail->SMTPSecure = $_ENV['MAIL_ENCRYPTION']; // Enable TLS encryption, 'ssl' also accepted
            $mail->Port = $_ENV['MAIL_PORT']; // TCP port to connect to

            // Set sender and recipient
            $mail->setFrom('infor@gwlbrandingservices.com.ng', 'GWL');
            $mail->addAddress($email);

            // Set email subject and body
            $resetLink =  $_ENV['WEB_URL'] . 'reset?token=' . $token;
            $companyName="GWL";
            $message = file_get_contents('../EmailTemplates/resetpassword.html');
            $message = str_replace('{{companyName}}', $companyName, $message);
            $message = str_replace('{{resetLink}}', $resetLink, $message);
            $mail->isHTML(true);
            $mail->Subject = 'Password Reset';
            $mail->Body = $message;
            // $mail->Body = 'Click the following link to reset your password: ' . $_ENV['WEB_URL'] . 'reset?token=' . $token;

            // Send email
            $mail->send();

            // Email sent successfully
            $response = array(
                'status' => true,
                'message' => 'We\'ve emailed you a password reset link.'
            );
        } catch (Exception $e) {
            // Failed to send email
            $response = array(
                'status' => false,
                'message' => 'Error sending password reset instructions.'
            );
        }
    } else {
        // Email does not exist in the database
        $response = array(
            'status' => false,
            'message' => 'Email address not found.'
        );
    }
} else {
    // Invalid request method
    $response = array(
        'status' => false,
        'message' => 'Invalid request method.'
    );
}

// Return the JSON response
header('Content-Type: application/json');
echo json_encode($response);

$db_conn->close();
?>