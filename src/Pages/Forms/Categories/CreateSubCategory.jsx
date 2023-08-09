import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";
import { useAuth } from "../../../context/AuthContext";
import { FormInput, FormSelect } from "../../../components/inputs";
import { FormButton } from "../../../components/buttons";
import { Addsubcategory_API } from "../../../API/API";
import { buttonTheme } from "../../../Data/GeneralData";
import { IconSelect } from "@tabler/icons-react";

function CreateSubCategory({ close }) {
  const { category, getSubCategory, categoryDropDown } = useAuth();
  const [loader, setLoader] = useState(false);

  const form = useForm({
    initialValues: {
      Main_category_name: "",
      Sub_category_name: "",
    },
    validate: {},
  });

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    form.validate();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 7500);
    const formData = new FormData();
    formData.append("categoryname", form.values.Main_category_name);
    formData.append("subcategoryname", form.values.Sub_category_name);
    if (form.validate().hasErrors) {
      toast.error(`Opps! Something isn't right.`);
      setLoader(false);
    } else {
      try {
        // Send the form data to the server
        const response = await axios.post(Addsubcategory_API, formData);

        if (response.data.status === true) {
          toast.success(response.data.message);
          setLoader(true);
          setTimeout(() => {
            getSubCategory();
            close();
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
  // const data =
  //   category === null || category === undefined
  //     ? []
  //     : category
  //         .filter((sub, index) => Number(sub.category_id) > 2)
  //         .map((_, index) => {
  //           return `${_.category}`;
  //         });
 
  return (
    <>
      <div className=" h-auto mt-3 mb-9 flex justify-center items-center">
        <form
          className=" md:px-12 h-auto flex flex-col  "
          onSubmit={handleSubmit}
        >
          <div className="text-center mt-2  ">
            <h2 className=" font-bold tracking-tighter  my-9 text-gwltheme-light text-3xl">
              Create Sub-category
            </h2>
          </div>
          <FormSelect
            searchable={true}
            formProps={form.getInputProps}
            icon={<IconSelect size="1rem" />}
            placeHolder="Select existing category"
            withAsterisk={true}
            required={true}
            inputName="Main_category_name"
            label="Select main category"
            data={categoryDropDown}
          />

          <FormInput
            className="my-2"
            withAsterisk={true}
            label="Sub_category name"
            PlaceHolder="Enter sub-category name"
            inputName="Sub_category_name"
            formProps={form.getInputProps}
            required={true}
          />

          <FormButton
            className="my-2 w-72 "
            px={60}
            gradient={{ from: buttonTheme.primary, to: buttonTheme.secondary }}
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
        </form>
      </div>
    </>
  );
}

export default CreateSubCategory;
