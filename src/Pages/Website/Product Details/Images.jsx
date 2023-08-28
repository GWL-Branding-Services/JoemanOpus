/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ImageCollection } from "../../../assets";

export default function Images({ product }) {
  const Discount =
    ((product.price - product.promo_price) / product.price) * 100;
 
  return (
    <div className="flex w-fit flex-col gap-8 ">
      <div className="h-[400px] overflow-hidden rounded-md relative">
        <div className="w-full h-full flex transition-transform duration-300 xl:w-[30vw]">
          <img
            src={
              product.img === undefined || product.img === null
                ? ImageCollection.load
                : process.env.API_IMAGE_URL + product.img
            }
            alt="Product Image"
            className="w-full h-full object-cover cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
}
