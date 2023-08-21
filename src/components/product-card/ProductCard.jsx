/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { ImageCollection } from "../../assets";


export default function ProductCard({
  img,
  productName,
  promoPrice,
  price,
  product,
}) {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (item) => {
    setIsHovered(true);
  };

  const handleMouseLeave = (item) => {
    setIsHovered(false);
  };

  return (
    <div
      className={`relative cursor-pointer text-black border-2 rounded-lg border-gray-300 flex flex-col-reverse min-w-[200px] lg:min-w-[300px] h-[270px] overflow-hidden transition-all duration-300 mt-4 ${
        isHovered ? "scale-[0.95]" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex flex-col p-4 space-y-2 z-50 absolute text-white transition duration-300 ${
          isHovered ? "translate-y-0" : "translate-y-14"
        }`}
      >
        <div className="flex flex-col">
          <span className="text-lg lg:text-xl">{product.name}</span>
        </div>
        <button
          className="bg-gwltheme p-2 rounded-full transition duration-300 hover:bg-white hover:text-black"
          onClick={() => {
            navigate(`/details/${product.category}/${product.products_id}`);
          }}
        >
          Shop Now
        </button>
      </div>
      <img
        src={img}
        alt="Product Image"
        className="w-full h-full absolute top-0 object-cover object-top"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60" />
    </div>
  );
}
