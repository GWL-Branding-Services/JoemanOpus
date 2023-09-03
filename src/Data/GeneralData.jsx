/* eslint-disable no-undef */
// GENERAL DATA FILE

const dummyProduct = [
  {
    name: "Loading...",
    products_id: 2,
    rating: 3,
    // img: "load.gif",
    inStock: 1,
    detail:
      "This is showing due to unstable internet services. Kindly reload the site and head to the homepage for better results",
  },
  {
    price: 5000,
    promo_price: 3000,
    name: "Loading...",
    products_id: 22,
    rating: 3,
    // img: "load.gif",
    category: "Clothing",
    sub_category: "Women",
    inStock: 1,
    detail:
      "This is showing due to unstable internet services. Kindly reload the site and head to the homepage for better results",
  },
  {
    price: 5000,
    promo_price: 3000,
    name: "Loading...",
    products_id: 299,
    rating: 3,
    // img: "load.gif",
    category: "Clothing",
    sub_category: "Women",
    inStock: 1,
    detail:
      "This is showing due to unstable internet services. Kindly reload the site and head to the homepage for better results",
  },
  {
    price: 5000,
    promo_price: 3000,
    name: "Loading...",
    products_id: 23,
    rating: 3,
    // img: "load.gif",
    category: "Clothing",
    sub_category: "Women",
    inStock: 1,
    detail:
      "This is showing due to unstable internet services. Kindly reload the site and head to the homepage for better results",
  },
  {
    price: 5000,
    promo_price: 3000,
    name: "Loading...",
    products_id: 27,
    rating: 3,
    // img: "load.gif",
    category: "Clothing",
    sub_category: "Women",
    inStock: 1,
    detail:
      "This is showing due to unstable internet services. Kindly reload the site and head to the homepage for better results",
  },
  {
    price: 5000,
    promo_price: 3000,
    name: "Loading...",
    products_id: 29,
    rating: 3,
    // img: "load.gif",
    category: "Clothing",
    sub_category: "Women",
    inStock: 1,
    detail:
      "This is showing due to unstable internet services. Kindly reload the site and head to the homepage for better results",
  },
];

// Boollist Data
const boolList = [
  { value: "1", label: "Yes" },
  { value: "00", label: "No" },
];

// Rating Data
const ratingData = [
  { value: 1, label: "1 Star" },
  { value: 2, label: "2 Star" },
  { value: 3, label: "3 Star" },
  { value: 4, label: "4 Star" },
  { value: 5, label: "5 Star" },
];

// Button Theme Data
const buttonTheme = {
  primary: "#693813",
  secondary: "#cf6b20",
};
 
const navigationRight = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/product/Shop/All Products" },
  { name: "Contact Us", href: `https://api.whatsapp.com/send?phone=234${
    process.env.PHONE_NUMBER
  }&text=Hello!` },
];
 

const extraInfo = [
  {
    heading: "Details",
    subMenu2: [{}],
    id: 1,
  },
 
];

export {
  boolList,
  dummyProduct,
  ratingData,
  buttonTheme, 
  navigationRight, 
  extraInfo,
};
