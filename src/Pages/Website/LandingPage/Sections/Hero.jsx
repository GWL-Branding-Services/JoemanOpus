/* eslint-disable no-unused-vars */
import { Image, Button } from "@mantine/core";
import React from "react";
import { ImageCollection } from "../../../../assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
  const heroSlides = [
    {
      image: ImageCollection.firstOrgan,
      text: "Welcome to Joeman Opus",
      desc: "Discover the perfect harmony of innovation and craftsmanship with our premium Viscount Organs and high-quality speakers.",
      buttonText: "Explore Now",
      buttonLink: "#",
    },
    {
      image: ImageCollection.pedal,
      text: "Premium Organs, Pedals and Speakers",
      desc: "Curating a delightful collection of Viscount Organs and top-notch speakers to elevate your musical journey.",
      buttonText: "Find Yours",
      buttonLink: "#",
    },
    {
      image: ImageCollection.secondOrgan,
      text: "Embrace Musical Enchantment with Joeman Opus",
      desc: "Embark on an unparalleled musical adventure with our exquisite Viscount Organs and mesmerizing speakers.",
      buttonText: "Start Now",
      buttonLink: "#",
    },
    // Add more slides as needed
  ];

  const sliderSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // fade: true,
    autoplaySpeed: 5000,
  };
  return (
    <Slider {...sliderSettings} className="cursor-pointer">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          style={{ position: "relative" }}
          className="overflow-hidden h-[90vh] md:h-[100vh] relative w-full h-fulls"
        >
          <Image
            src={slide.image}
            alt={`Slider Image ${index + 1}`}
            fit="cover"
            className=" md:hidden"
            height={800} // Adjust the image height as needed
          />
          <Image
            src={slide.image}
            alt={`Slider Image ${index + 1}`}
            fit="cover"
            className="hidden md:block"
            height={700} // Adjust the image height as needed
          />
          {/* Dark overlay */}
          {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10" /> */}
          <div className="absolute bottom-0  -left-96 md:-left-8  md:right-64   w-[100rem] md:w-[100rem] h-[100rem] bg-gradient-to-b from-black transform -rotate-90 to-transparent opacity-90 md:opacity-90" />

          <div className="px-10 md:px-20 absolute top-40 md:top-36 left-0 p-8 text-white">
            <h2 className="text-[40px] leading-10 md:text-6xl md:w-[35rem] w-[19rem] font-bold">
              {slide.text}
            </h2>
            <p className=" w-[19rem] md:w-[30rem] mt-4 ">{slide.desc}</p>
            <Button
              variant="default"
              className="mt-4 bg-white hover:border hover:border-orange-700  hover:bg-orange-600 hover:text-white relative top-0 hover:top-3 duration-500 transition-all 
              ease-in-out "
              color="orange"
              size="md"
              component="a"
              href={`https://api.whatsapp.com/send?phone=234${
                process.env.PHONE_NUMBER
              }&text=Hello!`}
              // href={slide.buttonLink}
            >
              {slide.buttonText}
            </Button>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default Hero;
