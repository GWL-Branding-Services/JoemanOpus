/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  BeginJourney,
  Features,
  Hero,
  Offer,
  Products,
  Welcome,
} from "../Sections";
import { useAuth } from "../../../../context/AuthContext";
import { dummyProduct } from "../../../../Data/GeneralData";
import { ProductCard } from "../../../../components";

function Landing() {
  const { products } = useAuth();

  const filteredProduct = products || dummyProduct;

  console.log();

  return (
    <>
      <Hero />
      <Welcome />
      <Offer />
      <Features />
      <BeginJourney />
      <Products prod={filteredProduct} />
    </>
  );
}

export default Landing;
