<?php
header('Access-Control-Allow-Origin: http://localhost:3080');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Accept, X-Requested-With");

header('Access-Control-Allow-Origin: http://localhost:3080');

require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['DB_HOST'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$database = $_ENV['DB_DATABASE'];
 

// Create a new MySQLi instance
$db_conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($db_conn->connect_error) {
    die('Database connection failed: ' . $db_conn->connect_error);
}
?>
