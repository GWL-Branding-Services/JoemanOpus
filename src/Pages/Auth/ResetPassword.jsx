import { isEmail, useForm } from "@mantine/form";
import React, { useState } from "react";
import {
  FormCheckBox,
  FormInput,
  FormPassword,
  FormSelect,
} from "../../components/inputs";
import { FormButton } from "../../components/buttons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IconAt, IconKey, IconPhone, IconUser } from "@tabler/icons-react";
import axios from "axios";
import { Register_API, Reset_API } from "../../API/API";
import { IconSelect } from "@tabler/icons-react";
import { buttonTheme } from "../../Data/GeneralData";
import { toast } from "react-toastify";

function ResetPassword() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm({
    initialValues: {
      Password: "",
      CPassword: "",
    },
    validate: {
      Password: (value) =>
        value.length < 6 ? "Passwords cannot be less than 6 characters!" : null,

      CPassword: (value, values) =>
        value !== values.Password ? "Passwords did not match" : null,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.validate();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 7500);
    const formData = new FormData();
    formData.append("password", form.values.Password);
    formData.append("token", token);
    if (form.validate().hasErrors) {
      toast.error(`Opps! Something isn't right.`);
      setLoader(false);
    } else {
      try {
        // Send the form data to the server
        const response = await axios.post(Reset_API, formData);
        if (response.data.status === true) {
          toast.success(response.data.message);

          setLoader(false);
          //   localStorage.setItem("token", response.data.token);
          setTimeout(() => {
            navigate("/login");
          }, 2500);
        } else {
          toast.error(response.data.message);
          setLoader(false);
        }
      } catch (error) {
        console.error(error);
        error.message === "Network Error"
          ? toast.error(error.message)
          : toast.error(error.response.data.message);
        setLoader(false);
      }
    }
  }; 

  return (
    <div>
      <div className=" h-auto mt-20 mb-9 flex justify-center items-center">
        <form
          className="w-96  md:px-9 h-auto container m-4"
          onSubmit={handleSubmit}
        >
          <div className="text-center mt-2  ">
            <h2 className="font-bold tracking-tighter  my-9 text-gwltheme-light text-3xl">
              Reset Password
            </h2>
          </div>

          {/* Passsword */}
          <FormPassword
            withAsterisk={true}
            label="New password"
            placeHolder="Enter new password"
            icon={<IconKey size="1rem" />}
            inputName="Password"
            formProps={form.getInputProps}
            required={true}
          />
          <FormPassword
            withAsterisk={true}
            label="Confirm Password"
            icon={<IconKey size="1rem" />}
            placeHolder="Confirm new password"
            inputName="CPassword"
            formProps={form.getInputProps}
            required={true}
          />
           
          <FormButton
            gradient={{ from: buttonTheme.primary, to: buttonTheme.secondary  }}
            text="Reset password"
            disabled={false}
            variant="gradient"
            loaderPosition="right"
            rightIcon=""
            fullWidth={true}
            leftIcon=""
            color="orange"
            radius="lg"
            loading={loader}
          />

         
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
