/* eslint-disable no-undef */
import { ImageCollection } from "../assets";

const Products_API = `${process.env.API_URL}${process.env.PRODUCTS_API}`;
const Addproducts_API = `${process.env.API_URL}${process.env.ADDPRODUCTS_API}`;
const Deleteproducts_API = `${process.env.API_URL}${process.env.DELETE_PRODUCTS_API}`;
const Updateproducts_API = `${process.env.API_URL}${process.env.UPDATE_PRODUCTS_API}`;
const Addcategory_API = `${process.env.API_URL}${process.env.ADDCATEGORY_API}`;
const Addsubcategory_API = `${process.env.API_URL}${process.env.ADDSUBCATEGORY_API}`;
const Category_API = `${process.env.API_URL}${process.env.CATEGORY_API}`;
const Sub_category_API = `${process.env.API_URL}${process.env.SUB_CATEGORY_API}`;
const Deletecategory_API = `${process.env.API_URL}${process.env.DELETE_CATEGORY_API}`;
const Deletesubcategory_API = `${process.env.API_URL}${process.env.DELETE_SUB_CATEGORY_API}`;
const Register_API = `${process.env.API_URL}${process.env.REGISTER}`;
const Login_API = `${process.env.API_URL}${process.env.LOGIN}`;
const Forgot_API = `${process.env.API_URL}${process.env.FORGOT}`;
const Reset_API = `${process.env.API_URL}${process.env.RESET}`;
const Verify_API = `${process.env.API_URL}${process.env.VERIFY}`;
const Users_API = `${process.env.API_URL}${process.env.USERS_API}`;
const Purchace_API = `${process.env.API_URL}${process.env.PURCHASE_API}`;
const Addcustomer_API = `${process.env.API_URL}${process.env.ADDCUSTOMER_API}`;
const Customer_API = `${process.env.API_URL}${process.env.CUSTOMER_API}`;
const Deletecustomer_API = `${process.env.API_URL}${process.env.DELETE_CUSTOMER_API}`;

const fallbackImg = ImageCollection.logo;
export {
  Products_API,
  Addproducts_API,
  Deleteproducts_API,
  Updateproducts_API,
  Category_API,
  Sub_category_API,
  Addcategory_API,
  Addsubcategory_API,
  Deletecategory_API,
  Deletesubcategory_API,
  Register_API,
  Login_API,
  Forgot_API,
  Reset_API,
  Verify_API,
  Users_API,
  Purchace_API,
  fallbackImg,
  Addcustomer_API,
  Customer_API,
  Deletecustomer_API,
};
