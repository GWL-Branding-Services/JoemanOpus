// GENERAL DATA FILE

const dummyProduct = [
  {
    price: 5000,
    promo_price: 3000,
    name: "Loading...",
    products_id: 2,
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
  primary: "#581C87",
  secondary: "#E111F2",
};
const navigationLeft = [
  { name: "The City", href: "#!" },
  { name: "Residence", href: "#!" },
  { name: "The Developer", href: "#!" },
];
const navigationRight = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "#!" },
  { name: "Whatsapp Us", href: `https://api.whatsapp.com/send?phone=234${
    process.env.PHONE_NUMBER
  }&text=Hello!` },
];

// Subscription Plan Data
const subscriptionPlan = [
  { value: "Basic", label: "Basic" },
  { value: "Master", label: "Master" },
];

export {
  boolList,
  dummyProduct,
  ratingData,
  buttonTheme,
  navigationLeft,
  navigationRight,
  subscriptionPlan,
};
