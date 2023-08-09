<?php
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Content-Type: application/json"); 
require 'server.php';
// Check if all required fields are provided
$required_fields = ['productname', 'productprice', 'productpromoprice', 'productrecent', 'producttrending', 'productinstock', 'productdetail', 'productcategory', 'productsubcategory', 'productrating'];
if (count(array_diff($required_fields, array_keys($_POST))) > 0) {
    echo json_encode(['status' => false, 'message' => 'Please fill all the required fields']);
    exit();
}

$name = $_POST['productname'];
$price = $_POST['productprice'];
$promo_price = $_POST['productpromoprice'];
$recent = $_POST['productrecent'];
$trending = $_POST['producttrending'];
$instock = $_POST['productinstock'];
$detail = $_POST['productdetail'];
$category = $_POST['productcategory'];
$sub_category = $_POST['productsubcategory'];
$rating = $_POST['productrating'];
$date = date("Y-m-d");

 

    // Check if image file is uploaded
    if (isset($_FILES['productimage'])) {
        $target_dir = "images/";
        $image_name = basename($_FILES["productimage"]["name"]);
        $target_file = $target_dir . $image_name;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Check if image file is an actual image or fake image
        $check = getimagesize($_FILES["productimage"]["tmp_name"]);
        if ($check !== false) {
            // Allow only certain file formats
            if (
                $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
                && $imageFileType != "gif"
            ) {
                echo json_encode(["status" => false, "message" => "Sorry, only JPG, JPEG, PNG & GIF files are allowed."]);
                return;
            }

            // Move uploaded file to destination folder
            if (move_uploaded_file($_FILES["productimage"]["tmp_name"], $target_file)) {
                $image = $image_name;
            } else {
                echo json_encode(["status" => false, "message" => "Sorry, there was an error uploading your file."]);
                return;
            }
        } else {
            echo json_encode(["status" => false, "message" => "File is not an image."]);
            return;
        }
    } else {
        $image = null;
    }

// Use prepared statement to insert data into the database
$stmt = $db_conn->prepare("INSERT INTO products (name, price, promo_price, date, img, recent, trending, inStock, detail, category, sub_category, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssssssss", $name, $price, $promo_price, $date, $image, $recent, $trending, $instock, $detail, $category, $sub_category, $rating);
$add = $stmt->execute();

if ($add) {
    echo json_encode(['status' => true, 'message' => 'Product Created Successfully.']);
} else {
    // Get the specific database error message
    echo json_encode(['status' => false, 'message' => 'Database Error: ' . $stmt->error]);
}
?>