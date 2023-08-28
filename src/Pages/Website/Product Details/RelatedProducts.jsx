import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { dummyProduct } from "../../../Data/GeneralData";
import { ImageCollection } from "../../../assets";
import { Carousel } from "@mantine/carousel";
import { Heading, ProductCard } from "../../../components";

export default function RelatedProducts() {
  const { products } = useAuth();
  const params = useParams();
  const { cat, sub } = params;
  function getRandomProducts(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  const relatedProduct =
    products && products.filter((prod, index) => prod.category === cat);
  // const relatedProduct =
  const filteredProduct = getRandomProducts(
    (relatedProduct && relatedProduct) || dummyProduct,
    10
  );

  return (
    <div className="my-16 w-screen px-[1rem]">
      <Heading text="Related" /> 
      <Carousel
        withIndicators
        withKeyboardEvents
        className="bg-white overflow-hidden mt-9 "
        dragFree
        slideSize="13%"
        loop={filteredProduct && filteredProduct.length > 10 ? true : false}
        align="start"
        breakpoints={[
          { maxWidth: "lg", slideSize: "100%" },
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "10%", slideGap: 0 },
        ]}
      >
        {filteredProduct &&
          filteredProduct.map((prod, index) => (
            <Carousel.Slide
              key={index}
              className="transition-all relative  grid justify-items-stretch   duration-700 bg-white w-fit  cursor-grabbing rounded-lg hover:scale-90  ease-in-out"
              mx={10}
            >
              <ProductCard
                img={
                  prod.img === undefined || prod.img === null
                    ? ImageCollection.load
                    : process.env.API_IMAGE_URL + prod.img
                }
                productName={prod.name}
                product={prod}
              />
            </Carousel.Slide>
          ))}
      
      </Carousel>
       
    </div>
  );
}
