import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";
import { Updateproducts_API } from "../../../API/API";
import { FormInput, FormSelect, ImageUpload } from "../../../components/inputs";
import { FormButton } from "../../../components/buttons";
import { useAuth } from "../../../context/AuthContext";
import { IconSelect } from "@tabler/icons-react";
import { boolList } from "../../../Data/GeneralData";
import { buttonTheme } from "../../../Data/GeneralData"; 

function UpdateProducts({ close, productId, products }) {
  const { getProduct, category, subCategory, categoryDropDown } = useAuth();
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  //
  //
  const currentProduct =
    products.find((product) => product.products_id === productId) || {};

  //
  //
  const form = useForm({
    initialValues: {
      Product_name: currentProduct.name,
      Product_category: currentProduct.category,
      Product_sub_category: currentProduct.sub_category,
      Product_price: currentProduct.price,
      Product_promo_price: currentProduct.promo_price,
      Product_inStock: currentProduct.inStock,
      Product_detail: currentProduct.detail,
    },
    validate: {},
  });
  //
  //
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 7500);

    const formData = new FormData();
    formData.append("productname", form.values.Product_name);
    formData.append("productprice", form.values.Product_price);
    formData.append("productpromoprice", form.values.Product_promo_price);
    formData.append("productstock", form.values.Product_inStock);
    formData.append("productdetail", form.values.Product_detail);
    formData.append("productcategory", form.values.Product_category);
    formData.append("productsubcategory", form.values.Product_sub_category);
    formData.append("productimage", profileImage);
    formData.append("productID", productId);

    if (form.validate().hasErrors) {
      toast.error(`Opps! Something isn't right.`);
      setLoader(false);
    } else {
      try {
        // Send the form data to the server
        const response = await axios.post(Updateproducts_API, formData);

        if (response.data.status === true) {
          toast.success(response.data.message);
          setLoader(false);
          setTimeout(() => {
            close();
            getProduct();
          }, 1500);
        } else {
          console.log(response);
          toast.error(response.data.message);
          setLoader(false);
        }
      } catch (error) {
        console.error(error);
        error.message === "Network Error"
          ? toast.error(error.response.message)
          : toast.error(error.response.data.message);
        setLoader(false);
      }
    }
  };
  //

  //
  //
  //
  //filter SUBCATEGORY DROPDOWN
  const subCategoryDropDown =
    subCategory === null || subCategory === undefined
      ? []
      : subCategory
          .filter(
            (subCategory) =>
              subCategory.category === form.values.Product_category
          )
          .map((_, index) => {
            return `${_.sub_category}`;
          });
  //
  return (
    <>
      <div className=" h-auto mt-3 mb-9 flex justify-center items-center">
        <form className=" md:px-6 h-auto container m-4" onSubmit={handleUpdate}>
          <div className="text-center mt-2  ">
            <h2 className=" font-bold tracking-tighter  my-9 text-purple-700 text-3xl">
              Update Product
            </h2>
          </div>
          <div className="lg:grid grid-cols-2 gap-6">
            {/*  */}
            {/*  */}
            {/*  */}
            <div className="">
              <FormInput
                className="my-2"
                withAsterisk={true}
                label="Product name"
                placeHolder="Enter product name"
                inputName="Product_name"
                formProps={form.getInputProps}
                required={true}
              />

              <div className="flex flex-col md:flex-row md:gap-4">
                {/* <FormInput
                  className="my-2"
                  withAsterisk={true}
                  label="Product price"
                  placeHolder="Enter product price"
                  type="number"
                  // icon={<IconUser size="1rem" />}
                  inputName="Product_price"
                  formProps={form.getInputProps}
                  required={true}
                /> */}
              </div>
                <FormInput
                  // disabled={form.values.Product_price === "" ? true : false}
                  className="my-2"
                  withAsterisk={true}
                  label="Price"
                  placeHolder="Enter price"
                  type="number"
                  // icon={<IconUser size="1rem" />}
                  inputName="Product_promo_price"
                  formProps={form.getInputProps}
                  required={true}
                />

              {/* <FormSelect
                searchable={true}
                formProps={form.getInputProps}
                icon={<IconSelect size="1rem" />}
                placeHolder="Select product category"
                withAsterisk={true}
                inputName="Product_category"
                label="Product category"
                data={categoryDropDown}
              />
              <FormSelect
                searchable={true}
                formProps={form.getInputProps}
                icon={<IconSelect size="1rem" />}
                placeHolder="Select sub-category"
                withAsterisk={true}
                inputName="Product_sub_category"
                label="Product sub-category"
                data={subCategoryDropDown}
                // data={Category}
              /> */}
              <FormSelect
                searchable={true}
                formProps={form.getInputProps}
                icon={<IconSelect size="1rem" />}
                placeHolder="Is this product available"
                withAsterisk={true}
                inputName="Product_inStock"
                label="Product Stock"
                data={boolList}
              />
              <FormInput
                className="my-2"
                withAsterisk={true}
                label="Product detail"
                placeHolder="Enter product detail"
                // icon={<IconUser size="1rem" />}
                inputName="Product_detail"
                formProps={form.getInputProps}
                required={true}
              />
            </div>
            <div className="">
              <ImageUpload setProfileImage={setProfileImage} />
              <div className="my-3">
                <FormButton
                  className="my-12 w-72 "
                  px={60}
                  gradient={{
                    from: buttonTheme.primary,
                    to: buttonTheme.secondary,
                  }}
                  text="Update Product"
                  disabled={false}
                  variant="gradient"
                  loaderPosition="right"
                  // rightIcon=""
                  // fullWidth={true}
                  // leftIcon=""
                  color="orange"
                  radius="lg"
                  loading={loader}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateProducts;
