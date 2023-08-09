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
header('Content-Type: text/html; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Function to send email
function sendEmail($to, $subject, $body)
{
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = $_ENV['MAIL_HOST']; // SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['MAIL_USERNAME']; // SMTP username
        $mail->Password = $_ENV['MAIL_PASSWORD']; // SMTP password
        $mail->SMTPSecure = $_ENV['MAIL_ENCRYPTION']; // Enable TLS encryption, 'ssl' also accepted
        $mail->Port = $_ENV['MAIL_PORT']; // TCP port to connect to

        // Sender and recipient
        $mail->setFrom($_ENV['BUSINESS_EMAIL'], $_ENV['BUSINESS_NAME']);
        $mail->addAddress($to);

        // Email content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;

        // Send the email
        $mail->send();
        return ['status' => true, 'message' => 'Email sent successfully!'];
    } catch (Exception $e) {
        return ['status' => false, 'message' => 'Error sending email: ' . $mail->ErrorInfo];
    }
}

// 
// 
// 
// Get the buyer's email address, name, and phone number from the request
$buyerEmail = $_POST['buyerEmail']; // Replace with the field name for the buyer's email
$buyerName = $_POST['buyerName']; // Replace with the field name for the buyer's name
$buyerPhone = $_POST['buyerPhone']; // Replace with the field name for the buyer's phone number

// 
// Retrieve the products from the request data
$products = isset($_POST['products']) ? json_decode($_POST['products'], true) : [];

// Get the buyer's email address and total amount paid from the request
$buyerEmail = $_POST['buyerEmail']; // Replace with the field name from your frontend
$totalAmountPaid = $_POST['totalAmountPaid']; // Replace with the field name from your frontend

// Extract the necessary information from the products
$filteredProducts = array_map(function ($product) {
    $total = $product['promo_price'] * $product['amount'];
    $price = $product['promo_price'];
    $totalFormatted = number_format($total, 2);
    $priceFormatted = number_format($price, 2);
    return [
        'name' => $product['name'],
        'price' => $priceFormatted,
        'quantity' => $product['amount'],
        'total' => $totalFormatted, // Use the formatted total amount
        'image' => $product['img'] // Replace 'image' with 'url'
    ];
}, $products);

// Load the Twig template
$loader = new FilesystemLoader('./EmailTemplates');
$twig = new Environment($loader);
$template = $twig->load('buyerproductpurchace.html');

// 
// OTHER Details
$sellerEmail = $_ENV['BUSINESS_EMAIL']; // Replace with actual seller's email address
$sellerName = $_ENV['BUSINESS_NAME']; // Replace with actual seller's Store Name
$imageUrl = $_ENV['IMAGE_URL'];
// Format the total amount with commas using number_format()
$totalAmountPaidFormatted = number_format($totalAmountPaid, 2);
// 
// 
// Render the email template with the actual values
$body = $template->render([
    'products' => $filteredProducts,
    'totalAmountPaid' => $totalAmountPaidFormatted,
    'imageurl' => $imageUrl,
    'adminName' => $sellerName,
    'adminEmail' => $sellerEmail,
    'buyerName' => $buyerName,

]);
 
// 
// 
// 
// SELLER
// 
// 
// 
// 
// Send email to the seller

// Load the Twig template for the seller email (similar to the buyer template)
$sellerTemplate = $twig->load('sellerproductpurchace.html');

// Render the seller email template with the actual values
$sellerBody = $sellerTemplate->render([
    'products' => $filteredProducts,
    'totalAmountPaid' => $totalAmountPaidFormatted,
    'imageurl' => $imageUrl,
    'adminName' => $sellerName,
    'adminEmail' => $sellerEmail,
    'buyerEmail' => $buyerEmail,
    'buyerName' => $buyerName,
    'buyerPhone' => $buyerPhone,
]);

 
// Send email to the buyer and get the status
$buyerEmailStatus = sendEmail($buyerEmail, 'Order Confirmation', $body);

// Send email to the seller and get the status
$sellerEmailStatus = sendEmail($sellerEmail, 'New Order', $sellerBody);

// Response JSON
$response = [
    'bstatus' => $buyerEmailStatus,
    'sstatus' => $sellerEmailStatus,
];

// Set the appropriate headers and return the JSON response
header('Content-Type: application/json');
echo json_encode($response);
?> 
