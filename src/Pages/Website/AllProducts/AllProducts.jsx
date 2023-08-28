/* eslint-disable no-unused-vars */
import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FormInput, ProductCard } from "../../../components";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { dummyProduct } from "../../../Data/GeneralData";
import { ImageCollection } from "../../../assets";

function AllProducts() {
  const { products } = useAuth();

  const form = useForm({
    initialValues: {
      Search: "",
    },
  });
  const params = useParams();
  const { cat, sub } = params;
  function getRandomProducts(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }
 
  useEffect(()=>{
    getRandomProducts(
        products && products || dummyProduct,
        products && products.length || dummyProduct.length
      );
  },[])
  
  //   Filltering first based on category
  const filteredProduct =
    products && products.filter((prod, index) => prod.category === cat);
  //   Filltering Next based on Sub_category
  const filteredSub_categoryProducts =
    filteredProduct &&
    filteredProduct.filter((prod, index) => prod.sub_category === sub);
  //
  //
  // Render the products when the route is on shop
  const Renderprod = cat === "Shop" ? products || dummyProduct : filteredSub_categoryProducts || dummyProduct ;

  return (
    <div className="relative mt-44 w-full min-[450px]:p-5 p-10 flex flex-col">
      <div className="fixed top-[70px] left-0 z-30 md:flex px-16 w-full bg-black/50 py-6  items-center justify-between">
        <h2 className="text-2xl font-bold  mt-5 mb-2 md:mb-7 text-white  sm:text-4xl">
          {cat} Products
        </h2>
        <FormInput
          //   label="Search"
          type=""
          className={"w-56"}
          icon={<IconSearch size="1rem" />}
          placeHolder={`Search ${cat} Products`}
          inputName="Search"
          formProps={form.getInputProps}
          required={true}
        />
      </div>
      <div className="mt-16 min-[450px]:grid lg:grid-cols-3 items-center justify-center min-[450px]:grid-cols-2 gap-x-4">
        {Renderprod.filter((u) =>
          u.name.toLowerCase().includes(form.values.Search.toLowerCase())
        ).map((prod, index) => {
          return (
            <ProductCard
              key={prod.products_id}
              // eslint-disable-next-line no-undef
              img={prod.img === undefined || prod.img === null
                ? ImageCollection.load : process.env.API_IMAGE_URL + prod.img}
              productName={prod.name}
              product={prod}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AllProducts;
