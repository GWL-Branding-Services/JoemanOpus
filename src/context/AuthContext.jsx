/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Category_API,
  Customer_API,
  Products_API,
  Sub_category_API,
  Users_API,
} from "../API/API";
import axios from "axios";
import CryptoJS from "crypto-js";

export const JosemanAuthContext = createContext(null)

export function useAuth() {
  return useContext(JosemanAuthContext);
}

function AuthContextProvider({ children }) {
  // const generateToken = () => {
  //   // Generate a random 128-bit key
  //   const token = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
  //   return token;
  // };
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [users, setUsers] = useState(null);
  const [allCustomers, setAllCustomers] = useState(null);
  const [cart, setCart] = useState([]);

  const encryptData = (data, token) => {
    // Convert the data to a JSON string (if it's an object)
    const dataString = typeof data === "object" ? JSON.stringify(data) : data;
    // Encrypt the data using AES with the token as the key
    const encryptedData = CryptoJS.AES.encrypt(dataString, token).toString();
    return encryptedData;
  };
  

  const decryptData = (encryptedData, token) => {
    // Decrypt the data using AES with the token as the key
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, token);
    // Convert the decrypted data to a string and parse it to an object (if applicable)
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const decryptedData = tryParseJSON(decryptedString) || decryptedString;
    return decryptedData;
  };
  // Helper function to try parsing JSON
  const tryParseJSON = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return null;
    }
  };
  // wisdomoriero@gmail.com
  const token = process.env.TOK;

  //local
  //
  //
  const dataDecUser = JSON.parse(localStorage.getItem("user")) || {};
  const dataDecLogin = JSON.parse(localStorage.getItem("loggedIn")) || {};
  //
  //
  const currentUser = decryptData(dataDecUser, token) || {};
  const userLoggedIn = decryptData(dataDecLogin, token);

  //
  //
    // LOGOUT
  //
  const logout = () => {
    toast.success("Logged Out Successfully.");
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    setTimeout(() => {
      window.location.replace("/login");
    }, 2500);
  };
  //

  const getProduct = async () => {
    try {
      const response = await axios(Products_API);
      if (response.data.status === true) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      error.message === "Network Error"
        ? toast.error(error.message)
        : toast.error(error.response.data.message);
    }
  };
  //
  //
 
  const getCustomers = async () => {
    try {
      const response = await axios(Customer_API);
      if (response.data.status === true) {
        setAllCustomers(response.data.customers);
      } else {
        toast.error(response.data.message);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      error.message === "Network Error"
        ? toast.error(error.message)
        : toast.error(error.response.data.message);
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios(Category_API);
      if (response.data.status === true) {
        setCategory(response.data.category);
      } else {
        toast.error(response.data.message);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      error.message === "Network Error"
        ? toast.error(error.message)
        : toast.error(error.response.data.message);
    }
  };

  const getSubCategory = async () => {
    try {
      const response = await axios(Sub_category_API);
      if (response.data.status === true) {
        setSubCategory(response.data.subcategory);
      } else {
        toast.error(response.data.message);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      error.message === "Network Error"
        ? toast.error(error.message)
        : toast.error(error.response.data.message);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios(Users_API);
      if (response.data.status === true) {
        setUsers(response.data.users);
      } else {
        toast.error(response.data.message);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      error.message === "Network Error"
        ? toast.error(error.message)
        : toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getUsers();
    getProduct();
    getCategory();
    getSubCategory();
    getCustomers(); 
  }, []);
  
  function refreshSite(){
    getUsers();
    getProduct();
    getCategory();
    getSubCategory();
    getCustomers();
  }
  
  // 
  // 
  // 
  // 
  // 

  const addToCart = (product) => {
    const itemExists = cart.some(
      (item) => item.products_id === product.products_id
    );

    if (itemExists) {
      // Product already exists in the cart, do not add again
      return;
    }

    const newItem = { ...product, amount: 1 };
    const newCart = [...cart, newItem];

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.products_id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleChange = (item, amount) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.products_id === item.products_id) {
        return { ...cartItem, amount: cartItem.amount + amount };
      }
      return cartItem;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    const total = cart.reduce((acc, item) => {
      return acc + item.promo_price * item.amount;
    }, 0);

    return total.toFixed(2);
  };
  const carttotal = getTotal();

  //
  //
  //
  //filter CATEGORY DROPDOWN
  const categoryDropDown =
    category === null || category === undefined
      ? []
      : category
          .filter((sub, index) => Number(sub.category_id) > 2)
          .map((_, index) => {
            return `${_.category}`;
          });

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  const value = {
    getProduct, // call all products
    products, // Access all products
    getCategory,
    getSubCategory,
    category,
    subCategory,
    userLoggedIn,
    currentUser,
    getUsers, 
    users,
    getCustomers,
    allCustomers,
    cart,
    addToCart, 
    removeFromCart,
    clearCart,
    handleChange,
    getTotal,
    carttotal,
    categoryDropDown,
    refreshSite,
    //
    logout,
    // TOKEN
    token,
    encryptData,
    decryptData,
  };

  return <JosemanAuthContext.Provider value={value}>{children}</JosemanAuthContext.Provider>;
}

export default AuthContextProvider;
