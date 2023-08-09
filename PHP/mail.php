<?php
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Origin: http://localhost:3030');
// header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
// header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
// header('Content-Type: application/json');

// // Handle preflight OPTIONS request
// $method = $_SERVER['REQUEST_METHOD'];
// if ($method == "OPTIONS") {
//     header('Access-Control-Allow-Origin: *');
//     header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
//     header("HTTP/1.1 200 OK");
//     die();
// }
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Content-Type: application/json");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


// Set up your API response
$response = array(
    'status' => false,
    'message' => 'Email not sent'
);

// Instantiating PHPMailer
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = $_ENV['MAIL_HOST']; // SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['MAIL_USERNAME']; // SMTP username
    $mail->Password = $_ENV['MAIL_PASSWORD']; // SMTP password
    $mail->SMTPSecure = $_ENV['MAIL_ENCRYPTION']; // Enable TLS encryption, 'ssl' also accepted
    $mail->Port = $_ENV['MAIL_PORT']; // TCP port to connect to

    // Sender and recipient
    $mail->setFrom('wisdomoriero@gmail.com', 'Wisdom Oriero');
    $mail->addAddress ($_ENV['BUSINESS_EMAIL'], $_ENV['BUSINESS_NAME']);

    // Email content
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = 'Welcome to GWL';

    // Get the template name from the API URL
    $templateName = basename($_SERVER['REQUEST_URI']);
    $templatePath = './EmailTemplates/' . $templateName;

    // Check if the template file exists
    if (file_exists($templatePath)) {
        $template = file_get_contents($templatePath);

        // Replace placeholders with dynamic values
        $name = 'John Doe'; // Dynamic value for name
        $websiteUrl = $_ENV['WEB_URL']; // Dynamic value for website URL

        $template = str_replace('{{name}}', $name, $template);
        $template = str_replace('{{website_url}}', $websiteUrl, $template);

        $mail->Body = $template;

        // Send the email
        if ($mail->send()) {
            $response['status'] = true;
            $response['message'] = 'Email sent successfully!';
        } else {
            $response['message'] = 'Email could not be sent. Error: ' . $mail->ErrorInfo;
        }
    } else {
        $response['message'] = 'Template file not found.';
    }
} catch (Exception $e) {
    $response['message'] = 'Email could not be sent. Error: ' . $mail->ErrorInfo;
}

// Set the API response headers
header('Content-Type: application/json');
echo json_encode($response);
?>