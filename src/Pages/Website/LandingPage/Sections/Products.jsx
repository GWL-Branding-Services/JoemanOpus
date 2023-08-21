/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ProductCard from "../../../../components/product-card/ProductCard";
import { ImageCollection } from "../../../../assets";
import { Carousel } from "@mantine/carousel";
import { Heading } from "../../../../components";



export default function Featured({ prod }) {
  const renderedProducts = getRandomProducts(prod && prod, 10);
  function getRandomProducts(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  return (
    /* Featured Product */
    <div className={`px-[1rem] bg-gray-100 py-9 mt-10 `}>
      <Heading text="Check Out Our" /> 
      <Carousel
        withIndicators
        withKeyboardEvents
        className=" overflow-hidden mt-3 c-wsidth"
        dragFree
        slideSize="13%"
        loop={renderedProducts && renderedProducts.length > 10 ? true : false}
        align="start"
        breakpoints={[
          { maxWidth: "lg", slideSize: "100%" },
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "50%", slideGap: 0 },
        ]}
        
        
      >
        {renderedProducts &&
          renderedProducts.map((products, index) => (
            <Carousel.Slide
              key={index}
              className="transition-all relative  grid justify-items-stretch duration-700 w-fit  cursor-grabbing rounded-lg hover:scale-90  ease-in-out"
              mx={10} 
            >
              <ProductCard
                key={products.products_id}
                img={
                  products.img === undefined || products.img === null
                    ? ImageCollection.load
                    : process.env.API_IMAGE_URL + products.img
                }
                productName={products.name}
                product={products}
              />
            </Carousel.Slide>
          ))}
      </Carousel>
    </div>
  );
}
