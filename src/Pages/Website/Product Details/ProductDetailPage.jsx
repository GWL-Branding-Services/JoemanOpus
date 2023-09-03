/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ExtraInfo from "./ExtraInfo";
import Images from "./Images";
import Info from "./Info";
import RelatedProducts from "./RelatedProducts";
import { dummyProduct } from "../../../Data/GeneralData";
import { Helmet } from "react-helmet";

function ProductDetailPage() {
  const { products } = useAuth();
  const params = useParams();
  const { id } = params;
  const productForDetail =
    products && products.filter((prod, index) => prod.products_id === id);
  const [product] = productForDetail || dummyProduct;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{product.name}</title>
        <meta itemprop="image" content={process.env.API_IMAGE_URL + product.img} />
        <meta
          property="og:image"
          itemprop="image"
          content={process.env.API_IMAGE_URL + product.img}
        />
        <meta
          property="og:image:secure_url"
          content={process.env.API_IMAGE_URL + product.img}
        />
        <meta
          property="og:image:type"
          content={process.env.API_IMAGE_URL + product.img}
        />
        {/* 
    <!-- Size of image. Any size up to 300. Anything above 300px will not work in WhatsApp --> */}
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Joseman Opus" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <div
        className={`px-[1rem] mt-20 flex flex-col overflow-x-hidden justify-center items-center lg:mt-32`}
      >
        <div className=" lg:grid grid-cols-2 lg:gap-14 xl:gap-20">
          <Images product={product} />
          <div>
            <Info product={product} />
            <ExtraInfo product={product} />
          </div>
        </div>
        {/* <div>
          <RelatedProducts />
        </div> */}
      </div>
    </>
  );
}

export default ProductDetailPage;
