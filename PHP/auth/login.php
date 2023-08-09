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
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Retrieve user from the database based on email
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $db_conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $verificationStatus = $row['verification_status'];
        $first_name = $row['first_name'];

        if ($verificationStatus == 0) {
            // User is not verified, send the verification email
            $verificationToken = $row['verification_token'];

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
                $firstname = $first_name;
                $message = file_get_contents('../EmailTemplates/verifyemail.html');
                $message = str_replace('{{firstName}}', $firstname, $message);
                $message = str_replace('{{verificationLink}}', $verificationLink, $message);
                $mail->isHTML(true);
                $mail->Subject = 'Account Verification';
                $mail->Body = $message;

                // Send the email
                $mail->send();

                // Prepare the user data for response
                $user = array(
                    'id' => $row['user_id'],
                    'email' => $row['email'],
                    'first_name' => $row['first_name']
                    // Add more user fields as needed
                );

                $response = array(
                    'status' => false,
                    'message' => 'Verification link has been resent. Please check your email.',
                    'user' => $user
                );
            } catch (Exception $e) {
                $response = array(
                    'status' => false,
                    'message' => 'Error sending verification email: ' . $mail->ErrorInfo
                );
            }
        } else {
            // User is already verified, proceed with the login process
            $storedPassword = $row['password'];

            // Verify password
            if (password_verify($password, $storedPassword)) {
                // Password is correct, proceed with login

                // Prepare the user data for response
                $user = array(
                    'user_id' => $row['user_id'],
                    'first_name' => $row['first_name'],
                    'last_name' => $row['last_name'],
                    'phone_number' => $row['number'],
                    'role' => $row['role'],
                    'subscription' => $row['subscription'],
                    'verification_status' => $row['verification_status'],
                );

                $response = array(
                    'status' => true,
                    'message' => 'Login successful.',
                    'user' => $user
                );
            } else {
                // Invalid password
                $response = array(
                    'status' => false,
                    'message' => 'Invalid email or password.'
                );
            }
        }
    } else {
        // User not found
        $response = array(
            'status' => false,
            'message' => 'Invalid email or password.'
        );
    }
} else {
    // Invalid request, email or password not provided
    $response = array(
        'status' => false,
        'message' => 'Invalid request. Email or password not provided.'
    );
}

// Return the JSON response
header('Content-Type: application/json');
echo json_encode($response);

$db_conn->close();
?>
