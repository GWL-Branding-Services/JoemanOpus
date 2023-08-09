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
require 'server.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->subcategoryID) && !empty(trim($data->subcategoryID))) {
    $subcategoryID = mysqli_real_escape_string($db_conn, trim($data->subcategoryID));
    $add = mysqli_query($db_conn, "DELETE FROM sub_category WHERE sub_id ='$subcategoryID'");
    if ($add) {
        echo json_encode(["status" => true, "message" => "Sub-category deleted successfully."]);
        return;
    } else {
        echo json_encode(["status" => false, "message" => "Server Problem"]);
        return;
    }
} else {
    echo json_encode(["status" => false, "message" => "Please fill all the required fields"]);
    return;
}


 
?>