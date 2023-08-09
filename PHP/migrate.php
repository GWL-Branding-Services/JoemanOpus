<?php

// Database connection code here
require 'server.php';

// 
// 
// 
// 
// PRODUCTS TABLE //
// 


// Drop products table if it exists
$sqlDroProductsTable = "DROP TABLE IF EXISTS products";
if ($db_conn->query($sqlDroProductsTable) === TRUE) {
    echo "---Table 'products' dropped successfully!---\n";
} else {
    echo "Error dropping table 'products': " . $db_conn->error;
    exit;
}
// Create products table
$sqlCreateProducts = "CREATE TABLE products (
        products_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255),
        sub_category VARCHAR(255),
        recent VARCHAR(3) DEFAULT '0',
        price INT(100) NOT NULL,
        promo_price INT(100) NOT NULL,
        rating VARCHAR(100),
        trending VARCHAR(3) DEFAULT '0',
        url VARCHAR(255),
        inStock VARCHAR(3) DEFAULT '0',
        detail TEXT,
        img VARCHAR(255),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

if ($db_conn->query($sqlCreateProducts) === TRUE) {
    echo "---Products table created successfully!---\n";
} else {
    echo "Error creating products table: " . $db_conn->error;
    exit;
}


// 
// 
// 
// 
// SUBSCRIPTION TABLE //
// 
// 
// 
// Drop products_category table if it exists
// $sqlDropCategoryTable = "DROP TABLE IF EXISTS products_category";
// if ($db_conn->query($sqlDropCategoryTable) === TRUE) {
//     echo "---Table 'products_category' dropped successfully!---\n";
// } else {
//     echo "Error dropping table 'products_category': " . $db_conn->error;
//     exit;
// }

// // Create products_category table
// $sqlCreateCategory = "CREATE TABLE products_category (
//     category_id INT PRIMARY KEY AUTO_INCREMENT,
//     category VARCHAR(255) NOT NULL
// )";

// if ($db_conn->query($sqlCreateCategory) === TRUE) {
//     echo "---Table 'products_category' created successfully!---\n";
// } else {
//     echo "Error creating table 'products_category': " . $db_conn->error;
//     exit;
// }
// 
// PRODUCT CATEGORY TABLE //
// 
// 
// 
// Drop products_category table if it exists
$sqlDropCategoryTable = "DROP TABLE IF EXISTS products_category";
if ($db_conn->query($sqlDropCategoryTable) === TRUE) {
    echo "---Table 'products_category' dropped successfully!---\n";
} else {
    echo "Error dropping table 'products_category': " . $db_conn->error;
    exit;
}

// Create products_category table
$sqlCreateCategory = "CREATE TABLE products_category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL
)";

if ($db_conn->query($sqlCreateCategory) === TRUE) {
    echo "---Table 'products_category' created successfully!---\n";
} else {
    echo "Error creating table 'products_category': " . $db_conn->error;
    exit;
}
// 
// SUB CATEGORY
// 
// Drop sub_category table if it exists
$sqlDropSubCategoryTable = "DROP TABLE IF EXISTS sub_category";
if ($db_conn->query($sqlDropSubCategoryTable) === TRUE) {
    echo "---Table 'sub_category' dropped successfully!---\n";
} else {
    echo "Error dropping table 'sub_category': " . $db_conn->error;
    exit;
}

// Create sub_category table
$sqlCreateSubCategory = "CREATE TABLE sub_category (
    sub_id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL,
    sub_category VARCHAR(255) NOT NULL
)";

if ($db_conn->query($sqlCreateSubCategory) === TRUE) {
    echo "---Table 'sub_category' created successfully!---\n";
} else {
    echo "Error creating table 'sub_category': " . $db_conn->error;
    exit;
}

// 
// 
// 
// 
// USERS TABLE //
// 
// 
// 
// Drop users table if it exists
$sqlDropUsersTable = "DROP TABLE IF EXISTS users";
if ($db_conn->query($sqlDropUsersTable) === TRUE) {
    echo "---Table 'users' dropped successfully!---\n";
} else {
    echo "Error dropping table 'users': " . $db_conn->error;
    exit;
}

// Create users table
$sqlCreateUsers = "CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    number VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    subscription VARCHAR(255) NOT NULL,
    verification_token VARCHAR(255),
    verification_status INT DEFAULT 0,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";



if ($db_conn->query($sqlCreateUsers) === TRUE) {
    echo "---Table 'users' created successfully!---\n";
} else {
    echo "Error creating table 'users': " . $db_conn->error;
    exit;
}

// 
// 
// 
// 
// 
// 
// Customers TABLE //
// 
// 
// 
// Drop Customers table if it exists
$sqlDropCustomersTable = "DROP TABLE IF EXISTS customers";
if ($db_conn->query($sqlDropCustomersTable) === TRUE) {
    echo "---Table 'Customers' dropped successfully!---\n";
} else {
    echo "Error dropping table 'Customers': " . $db_conn->error;
    exit;
}

// Create Customers table
$sqlCreateCustomers = "CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    products VARCHAR(3500) NOT NULL, 
    total VARCHAR(255) NOT NULL, 
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";



if ($db_conn->query($sqlCreateCustomers) === TRUE) {
    echo "---Table 'Customers' created successfully!---\n";
} else {
    echo "Error creating table 'Customers': " . $db_conn->error;
    exit;
}

// 
// 
// 
// 
// INSERTING DATA INTO PRODUCTS TABLE //
// 
// 
// 
// Insert default data into products table
$sqlInsertData = "INSERT INTO products (name, category, sub_category, recent, price, promo_price, rating, trending, url, inStock, detail, img) 
VALUES 
    ('Ladies Solid Crop Cami Top & Bodycon Skirt', 'Clothing','Women' ,'1', 10000, 6000, '4', '1', 'http://', '1', 'Product 1 detail', 'v4.jpg'),
    ('Orlando Men\'s Quartz Wrist Watch', 'Watches', 'Men', '0', 7000, 5000, '3', '0', 'http://', '1', 'Product 2 detail', 'sd.jpg'),
    ('ORUSS Steel Band Waterproof Watch', 'Watches', 'Women', '1', 4000,  1500, '4', '1', 'http://', '0', 'Product 3 detail', 'v5.jpg'),
    ('Golden designed vintage long sleeve shirts', 'Clothes', 'Men', '1', 20000, 10000, '5', '1', 'http://', '1', 'just buy', 'v1.jpg'),
    ('Women short patttern gown', 'Clothes', 'Women', '00', 6000, 4500, '3', '1', 'http://', '1', 'just buy', '1.jpg'),
    ('Body warmer sweather, 100% cotton', 'Clothes', 'Women', '1', 14000, 6500, '5', '1', 'http://', '1', 'just buy', 'v7.jpg')";

if ($db_conn->query($sqlInsertData) === TRUE) {
    echo "---Inserted default PRODUCT data into products table!---\n";
} else {
    echo "Error inserting default data: " . $db_conn->error;
    exit;
}
// 
// 
// 
// Insert default data into products category table
$sqlInsertProductCategory = "INSERT INTO products_category ( category ) 
VALUES 
    ('Home'),
    ('Shop'),
    ('Clothes'),
    ('Watches')";

if ($db_conn->query($sqlInsertProductCategory) === TRUE) {
    echo "---Inserted default CATEGORY data  into CATEGORY table!---\n";
} else {
    echo "Error inserting default data: " . $db_conn->error;
    exit;
}
// 
// 
// 
// Insert default data into Subcategory table
$sqlInsertSubCategory = "INSERT INTO sub_category ( category, sub_category ) 
VALUES  
    ('Shop', 'All Products')";

if ($db_conn->query($sqlInsertSubCategory) === TRUE) {
    echo "---Inserted default SUB-CATEGORY data  into SUB-CATEGORY table!---\n";
} else {
    echo "Error inserting default data: " . $db_conn->error;
    exit;
}

$db_conn->close();