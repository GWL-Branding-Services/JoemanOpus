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
require '../vendor/autoload.php'; // Load Composer's autoloader

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();


// Retrieve user input from request
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$number = $_POST['number'];
$password = $_POST['password'];
$subscription = $_POST['subscription'];
// $status = $_POST['status'];
// Generate a random verification token
$verificationToken = bin2hex(random_bytes(32));

// Set role to "user"
$role = "user";

// Send the verification email
$mail = new PHPMailer(true);
try {
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host = $_ENV['MAIL_HOST']; // SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['MAIL_USERNAME']; // SMTP username
    $mail->Password = $_ENV['MAIL_PASSWORD']; // SMTP password
    $mail->SMTPSecure = $_ENV['MAIL_ENCRYPTION']; // Enable TLS encryption, 'ssl' also accepted
    $mail->Port = $_ENV['MAIL_PORT']; // TCP port to connect to

    // Sender and recipient
    $mail->setFrom($_ENV['BUSINESS_EMAIL'], $_ENV['BUSINESS_NAME']);
    $mail->addAddress($email, $first_name);
    
    // Email content
    $verificationLink = $_ENV['WEB_URL'] . 'verify?token=' . $verificationToken; 
    $message = file_get_contents('../EmailTemplates/verifyemail.html');
    $message = str_replace('{{firstName}}', $first_name, $message);
    $message = str_replace('{{verificationLink}}', $verificationLink, $message);
    $mail->isHTML(true);
    $mail->Subject = 'Account Verification';
    $mail->Body = $message;

    // Send the email
    $mail->send();

    $response = array(
        'status' => true,
        'message' => 'Registration successful! Please check your email for verification.'
    );
} catch (Exception $e) {
    $response = array(
        'status' => false,
        'message' => 'Error sending verification email: ' . $mail->ErrorInfo
    );
}

// Check if email already exists in the database
$sqlCheckEmail = "SELECT * FROM users WHERE email = '$email'";
$resultEmail = $db_conn->query($sqlCheckEmail);

if ($resultEmail->num_rows > 0) {
    // Email already exists, throw an error
    $response = array(
        'status' => false,
        'message' => 'Email already exists.'
    );
} else {
    // Insert the new user into the database
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $sqlInsertUser = "INSERT INTO users (first_name, last_name, email, number, password, role, subscription, verification_token) 
    VALUES ('$first_name', '$last_name', '$email', '$number', '$hashedPassword', '$role', '$subscription', '$verificationToken')";

    if ($db_conn->query($sqlInsertUser) === TRUE) {
        $response = array(
            'status' => true,
            'message' => 'Registeration successful!'
        );
    } else {
        $response = array(
            'status' => false,
            'message' => 'Error registering user: ' . $db_conn->error
        );
    }
}

// Convert response array to JSON format
$jsonResponse = json_encode($response);

// Send the JSON response
header('Content-Type: application/json');
echo $jsonResponse;

// Close the database connection
$db_conn->close();

?>