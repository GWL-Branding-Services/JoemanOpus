import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Addproducts_API, Products_API, fallbackImg } from "../../../API/API";
import { Button, Image } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../../../context/AuthContext";
import { FormInput, FormSelect, ImageUpload } from "../../../components/inputs";
import { FormButton } from "../../../components/buttons";
import { IconSelect } from "@tabler/icons-react";
import { boolList, buttonTheme, ratingData } from "../../../Data/GeneralData";
import { useNavigate } from "react-router-dom";

function CreateProducts() {
  const { products, subCategory, getProduct, category, categoryDropDown } =
    useAuth();
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      Product_name: "",
      Product_category: "",
      Product_sub_category: "",
      Product_recent: "",
      Product_price: "",
      Product_promo_price: "",
      Product_rating: "",
      Product_trending: "",
      Product_url: "",
      Product_inStock: "",
      Product_detail: "",
      Product_image: "",
    },
    validate: {},
  });

  const handleMail = async () => {
    try {
      // Send the form data to the server
      const response = await axios(
        `http://localhost:8000/mail.php/email-one.html`
      );
      if (response.data.status === true) {
        console.log(response);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      error.message === "Network Error"
        ? toast.error(error.message)
        : toast.error(error.response.data.message);
    }
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    form.validate();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 7500);
    const formData = new FormData();
    formData.append("productname", form.values.Product_name);
    formData.append("productprice", form.values.Product_price);
    formData.append("productpromoprice", form.values.Product_promo_price);
    formData.append("productrecent", form.values.Product_recent);
    formData.append("productinstock", form.values.Product_inStock);
    formData.append("producttrending", form.values.Product_trending);
    formData.append("productdetail", form.values.Product_detail);
    formData.append("productcategory", form.values.Product_category);
    formData.append("productsubcategory", form.values.Product_sub_category);
    formData.append("productrating", form.values.Product_rating);
    formData.append("productimage", profileImage);
    if (profileImage === undefined || profileImage === null) {
      toast.error(`please Upload an Image`);
      setLoader(false);
    } else if (form.validate().hasErrors) {
      toast.error(`Opps! Something isn't right.`);
      setLoader(false);
    } else {
      try {
        // Send the form data to the server
        const response = await axios.post(Addproducts_API, formData);

        if (response.data.status === true) {
          toast.success(response.data.message);
          setLoader(true);
          setTimeout(() => {
            getProduct();
          }, 2500);
          console.log(response);
        } else {
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
      {category && category.length === 1 ? (
        <>
          <div className="flex flex-col h-64 items-center justify-center">
            <h2 className="my-4">Create a product category first</h2>

            <FormButton
              className="my-2 w-72 "
              px={60}
              gradient={{
                from: buttonTheme.primary,
                to: buttonTheme.secondary,
              }}
              text="Create  Category"
              disabled={false}
              variant="gradient"
              loaderPosition="right"
              onClick={() => {
                navigate("/dashboard/category");
              }}
              color="orange"
              radius="lg"
              loading={loader}
            />
          </div>
        </>
      ) : (
        <>
          <div className="  h-auto mt-20 md:mt-3 mb-9 flex justify-center items-center">
            <form
              className=" md:px-32 h-auto container m-4"
              onSubmit={handleSubmit}
            >
              <div className="text-center mt-2  ">
                <h2 className="font-bold tracking-tighter my-9 text-gwltheme-light  text-3xl">
                  Create Product
                </h2>
              </div>
              <div className="lg:grid grid-cols-2 gap-6">
                <div className="">
                  <ImageUpload setProfileImage={setProfileImage} />

                  <FormInput
                    className="my-2"
                    withAsterisk={true}
                    label="Product name"
                    placeHolder="Enter product name"
                    inputName="Product_name"
                    formProps={form.getInputProps}
                    required={true}
                  />
                  <FormSelect
                    searchable={true}
                    formProps={form.getInputProps}
                    icon={<IconSelect size="1rem" />}
                    placeHolder="Select product category"
                    withAsterisk={true}
                    inputName="Product_category"
                    label="Product category"
                    data={categoryDropDown}
                    required={true}
                  />
                  <FormSelect
                    searchable={true}
                    disabled={
                      form.values.Product_category === "" ? true : false
                    }
                    formProps={form.getInputProps}
                    icon={<IconSelect size="1rem" />}
                    placeHolder="Select sub-category"
                    withAsterisk={true}
                    inputName="Product_sub_category"
                    label="Product sub-category"
                    data={subCategoryDropDown}
                    required={true}
                  />
                </div>
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="">
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <FormInput
                      className="my-2"
                      withAsterisk={true}
                      label="Product price"
                      placeHolder="Enter product price"
                      type="number"
                      // icon={<IconUser size="1rem" />}
                      inputName="Product_price"
                      formProps={form.getInputProps}
                      required={true}
                    />
                    <FormInput
                      disabled={form.values.Product_price === "" ? true : false}
                      className="my-2"
                      withAsterisk={true}
                      label="Discounted price"
                      placeHolder="Enter discounted price"
                      type="number"
                      // icon={<IconUser size="1rem" />}
                      inputName="Product_promo_price"
                      formProps={form.getInputProps}
                      required={true}
                    />
                  </div>

                  <FormSelect
                    searchable={true}
                    required={true}
                    formProps={form.getInputProps}
                    icon={<IconSelect size="1rem" />}
                    placeHolder="Select product rating"
                    withAsterisk={true}
                    inputName="Product_rating"
                    label="Product rating"
                    data={ratingData}
                  />

                  <FormSelect
                    required={true}
                    searchable={!true}
                    formProps={form.getInputProps}
                    icon={<IconSelect size="1rem" />}
                    placeHolder="Is this a recent product"
                    withAsterisk={true}
                    inputName="Product_recent"
                    label="Recent product"
                    data={boolList}
                  />

                  <FormSelect
                    searchable={true}
                    formProps={form.getInputProps}
                    icon={<IconSelect size="1rem" />}
                    placeHolder="Is this a trending product"
                    withAsterisk={true}
                    inputName="Product_trending"
                    required={true}
                    label="Product trending"
                    data={boolList}
                  />
                  <FormSelect
                    searchable={true}
                    formProps={form.getInputProps}
                    icon={<IconSelect size="1rem" />}
                    placeHolder="Is this product available"
                    withAsterisk={true}
                    required={true}
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

                  <FormButton
                    className="my-2 w-72 "
                    px={60}
                    gradient={{
                      from: buttonTheme.primary,
                      to: buttonTheme.secondary,
                    }}
                    text="Create Product"
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
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default CreateProducts;
