<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Specify the default port number
$defaultPort =  $_ENV['SEVER_PORT'];

// Get the port from the command line arguments or use the default port
$port = isset($argv[1]) ? $argv[1] : $defaultPort;

// Start the server
exec("php -S localhost:$port");
