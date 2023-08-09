/* eslint-disable react/no-unescaped-entities */
import { isEmail, useForm } from "@mantine/form";
import React, { useState } from "react";
import {
  FormCheckBox,
  FormInput,
  FormPassword,
  FormSelect,
} from "../../components/inputs";
import { FormButton } from "../../components/buttons";
import { Link, useNavigate } from "react-router-dom";
import { IconAt, IconKey, IconPhone, IconUser } from "@tabler/icons-react";
import axios from "axios";
import { Login_API, Register_API } from "../../API/API";
import { IconSelect } from "@tabler/icons-react";
import { buttonTheme } from "../../Data/GeneralData";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { currentUser, userLoggedIn,  token, encryptData } = useAuth();
  const form = useForm({
    initialValues: {
      Password: "",
      Email: "",
      Checkbox: "",
    },
    validate: {
      Email: isEmail("Invalid email"),
      Password: (value) =>
        value.length < 6 ? "Passwords cannot be less than 6 characters!" : null,
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
    formData.append("email", form.values.Email);
    formData.append("password", form.values.Password);
    if (form.validate().hasErrors) {
      toast.error(`Opps! Something isn't right.`);
      setLoader(false);
    } else {
      try {
        // Send the form data to the server
        const response = await axios.post(Login_API, formData);
        console.log(response);
        if (response.data.status === true) {
          toast.success(response.data.message);

          setLoader(false);
          //   localStorage.setItem("token", response.data.token);
          const user = encryptData(response.data.user, token);
          const loggedIn = encryptData("true", token);
          localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
          localStorage.setItem("user", JSON.stringify(user));   
          setTimeout(() => {
            window.location.href = "/dashboard"
            // navigate("/dashboard");
          }, 3500);
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
console.log(userLoggedIn)
  //   const data =
  //   SubscriptionPlan === null || SubscriptionPlan === undefined
  //     ? []
  //     : SubscriptionPlan.map((_, index) => {
  //         return `${_.category} `;
  //       });

  return (
    <div>
      <div className=" h-auto mt-3 mb-9 flex justify-center items-center">
        <form
          className="w-96  md:px-9 h-auto container m-4"
          onSubmit={handleSubmit}
        >
          <div className="text-center mt-2  ">
            <h2 className="font-bold tracking-tighter  my-9 text-gwltheme-light text-3xl">
              Login
            </h2>
          </div>
          <FormInput
            withAsterisk={true}
            label="Enter Email"
            icon={<IconAt size="1rem" />}
            type="email"
            placeHolder="Enter Email"
            inputName="Email"
            formProps={form.getInputProps}
            required={true}
          />
          {/* Passsword */}

          <FormPassword
            withAsterisk={true}
            label="Enter Password"
            icon={<IconKey size="1rem" />}
            placeHolder="Enter Password"
            inputName="Password"
            formProps={form.getInputProps}
            required={true}
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FormCheckBox
                // label=""
                inputName="Checkbox"
                formProps={form.getInputProps}
                required={false}
              />
              <h6 className="mx-2 text-sm">Remember me</h6>
            </div>
            <Link to="/forgot" className=" hover:text-gwltheme mx-2 text-sm">
              Forgot password
            </Link>
          </div>
          <FormButton
            gradient={{ from: buttonTheme.primary, to: buttonTheme.secondary }}
            text="Login"
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

          <div className="text-center">
            <h6>
              Don't have an account?
              <Link className="mx-3 hover:text-orange-600" to="/register">
                Register
              </Link>
            </h6>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
