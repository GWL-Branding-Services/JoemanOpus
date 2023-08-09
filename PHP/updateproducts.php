<?php
header('Access-Control-Allow-Origin: http://localhost:3030');
header("Content-Type: application/json");
require 'server.php';

// Check if all required fields are provided
$required_fields = ['productID', 'productname', 'productprice', 'productpromoprice', 'productstock', 'productcategory', 'productsubcategory', 'productdetail'];
if (count(array_intersect_key(array_flip($required_fields), $_POST)) !== count($required_fields)) {
    echo json_encode(['status' => false, 'message' => 'Please fill all the required fields']);
    return;
}

$id = $_POST['productID'];
$name = $_POST['productname'];
$promo_price = $_POST['productpromoprice'];
$price = $_POST['productprice'];
$stock = $_POST['productstock'];
$category = $_POST['productcategory'];
$sub_category = $_POST['productsubcategory'];
$detail = $_POST['productdetail'];
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
    // If image file is not uploaded, use the current image in the database
    $result = mysqli_query($db_conn, "SELECT * FROM products WHERE products_id='$id'");
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $image = $row['img'];
    } else {
        echo json_encode(["status" => false, "message" => "Invalid product id."]);
        return;
    }
}

// Use prepared statement to update data in the database
$stmt = $db_conn->prepare("UPDATE products SET name=?, price=?, promo_price=?, inStock=?, img=?, category=?, sub_category=?, detail=?, date=? WHERE products_id=?");
$stmt->bind_param("ssssssssss", $name, $price, $promo_price, $stock, $image, $category, $sub_category, $detail, $date, $id);
$update = $stmt->execute();

if ($update) {
    echo json_encode(["status" => true, "message" => "Product Updated Successfully."]);
} else {
    echo json_encode(["status" => false, "message" => "Server Problem"]);
}
?>
