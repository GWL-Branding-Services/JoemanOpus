/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";
import { Addcustomer_API, Customer_API, Purchace_API } from "../../../API/API";
import { Button, Modal, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { IconBrandReact, IconShare, IconStarFilled } from "@tabler/icons-react";
import { FormButton } from "../../../components";
import { buttonTheme } from "../../../Data/GeneralData";

export default function Info({ product }) {
  const [loader, setLoader] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const theme = useMantineTheme();
  //
  const [count, setCount] = useState(1);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  const totalCount = count * product.promo_price;
  const WhatsappBuy = `https://api.whatsapp.com/send?phone=234${
    process.env.PHONE_NUMBER
  }&text=*PURCHASE%20REQUEST:*%0a%0a*▫️Product%20Name:*%20${encodeURIComponent(
    product.name
  )}%0a*▫️Product%20Category:*%20${
    product.category
  }%0a*▫️Product%20Price:*%20₦%20${Intl.NumberFormat("en-US").format(
    product.promo_price
  )}%0a*▫️Product%20Quantity:*%20${count}%0a*▫️Product%20Link:*%20${`${process.env.WEB_URL}details/${product.products_id}`}%0a%0a*▫️Total:*%20₦%20${Intl.NumberFormat(
    "en-US"
  ).format(totalCount)}`;
  //
  //
  //
  //

  // Function to share the current URL using the Web Share API
  const shareUrl = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this product",
          url: window.location.href,
        });
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback: Copy the URL instead
      copyUrl();
    }
  };

  // // Function to copy the current URL to the clipboard
  const copyUrl = () => {
    const textField = document.createElement("textarea");
    textField.value = window.location.href;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("URL copied to clipboard");
  };

  function sendWhatsapp() {
    window.open(WhatsappBuy, "_blank");
  }
  //
  const addNewItem = { ...product, amount: count };
  const currentProductArray = [addNewItem];

  // const buyerEmail = "wisdom@gmail.com";
  const handleSendEmail = async (name, email, phone) => {
    setLoader(true);

    const formData = new FormData();
    formData.append("buyerEmail", email);
    formData.append("buyerName", name);
    formData.append("buyerPhone", phone);
    formData.append("totalAmountPaid", totalCount);
    formData.append("products", JSON.stringify(currentProductArray));

    const customerData = new FormData();
    customerData.append("customeremail", email);
    customerData.append("customername", name);
    customerData.append("customerphonenumber", phone);
    customerData.append("customerproduct", JSON.stringify(currentProductArray));
    customerData.append("totalAmountPaid", totalCount);
    try {
      const response = await axios.post(`${Purchace_API}`, formData);

      if (
        response.data.bstatus.status ||
        response.data.sstatus.status === true
      ) {
        console.log(response);
        //
        //
        //
        try {
          const res = await axios.post(`${Addcustomer_API}`, customerData);
          if (res.data.status === true) {
            console.log(res);
          } else {
            console.log(res);
          }
        } catch (er) {
          console.error(er);
        }
        setTimeout(() => {
          close();
          sendWhatsapp();
        }, 2000);
        //
        //
        //
        toast.success("Purchase successful");
        setLoader(false);
      } else {
        toast.error("Purchase failed");
        console.log(response);
        setLoader(false);
      }
    } catch (error) {
      console.error("Error occurred during purchase:", error);
      toast.error(error.message);

      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-10 lg:mt-0">
      <p className="font-extrabold transition duration-300   text-2xl">
        {product.name}
      </p>

      <div className="flex gap-x-4 items-center">
        <div
          className={` ${
            Number(product.inStock) !== 1
              ? "bg-red-600 text-white"
              : "bg-gray-300 text-gwltheme"
          } px-2 rounded-sm  text-sm py-1 font-semibold`}
        >
          {Number(product.inStock) !== 1 ? "Out of Stock" : "In Stock"}
        </div>
        <div className="flex w-[120px] h-5 text-[20px] cursor-pointer text-yellow-300">
          {(() => {
            const arra = product && product.rating;
            const ratingStar = [];
            for (let i = 0; i < arra; i++) {
              ratingStar.push(<IconStarFilled key={i} />);
            }
            return ratingStar;
          })()}
        </div>
        <span className="text-[11px] text-gray-400 ml-[-10px] mt-[3px]">
          2,130 reviews
        </span>
      </div>

      <div className="flex gap-3">
        <div className="text-gwltheme font-semibold text-3xl">
          ₦{Intl.NumberFormat("en-US").format(Number(product.promo_price))}
        </div>
        <div className="text-gray-400 font-semibold text-[13px] line-through mt-[0.5em]">
          ₦{Intl.NumberFormat("en-US").format(Number(product.price))}
        </div>
      </div>
      <div className="flex flex-col gap-4"></div>
      <div className="flex justify-between">
        <div className="border py-2 px-2 flex gap-4">
          <button
            className={`flex justify-center items-center w-6 h-6 ${
              count === 1 ? "bg-red-600 text-white" : "bg-gray-300"
            }  rounded-full text-[22px] cursor-pointer`}
            onClick={decrement}
            disabled={count === 1 ? true : false}
          >
            -
          </button>
          <div>{count}</div>
          <button
            disabled={Number(product.inStock) !== 1 ? true : false}
            className={`flex justify-center items-center w-6 h-6 ${
              Number(product.inStock) !== 1
                ? "bg-red-600 text-white"
                : "bg-gray-300"
            }  rounded-full text-[22px] cursor-pointer`}
            onClick={increment}
          >
            +
          </button>
        </div>
      </div>
      <div>
        <Button
          variant="default"
          color={buttonTheme.primary}
          size="md"
          component="a"
          onClick={() => {
            setTimeout(() => {
              window.open(WhatsappBuy, "_blank");
            }, 500);
          }}
          disabled={Number(product.inStock) !== 1 ? true : false}
          className={` ${
            Number(product.inStock) !== 1 ? "bg-slate-300 text-slate-600" : ""
          } my-4 bg-white hover:border hover:border-gwltheme  hover:bg-gwltheme hover:text-white relative top-0 hover:top-3 duration-500 transition-all 
          ease-in-out `}
        >
          Buy Now
        </Button>
      </div>
      <div
        className="cursor-pointer flex gap-4 hover:text-gwltheme font-semibold transition duration-300"
        onClick={() => {
          shareUrl(); // Share the URL
        }}
      >
        <IconShare className="w-6 h-6" />
        <span>Share</span>
      </div>
    </div>
  );
}
