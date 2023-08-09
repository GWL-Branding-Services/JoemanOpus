import { isEmail, useForm } from "@mantine/form";
import { useState } from "react";
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
import { Register_API } from "../../API/API";
import { IconSelect } from "@tabler/icons-react";
import { subscriptionPlan } from "../../Data/GeneralData";
import { buttonTheme } from "../../Data/GeneralData";
import { toast } from "react-toastify";

function Register() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      FirstName: "",
      LastName: "",
      Password: "",
      CPassword: "",
      Phonenumber: "",
      Subscription: "",
      Checkbox: "",
      Email: "",
    },
    validate: {
      Email: isEmail("Invalid email"),
      Password: (value) =>
        value.length < 6 ? "Passwords cannot be less than 6 characters!" : null,

      CPassword: (value, values) =>
        value !== values.Password ? "Passwords did not match" : null,
      FirstName: (value, values) =>
        values.FirstName === "" ? "Fill out this field" : null,
      LastName: (value, values) =>
        values.LastName === "" ? "Fill out this field" : null,
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
    formData.append("first_name", form.values.FirstName);
    formData.append("last_name", form.values.LastName);
    formData.append("email", form.values.Email);
    formData.append("number", form.values.Phonenumber);
    formData.append("password", form.values.Password);
    formData.append("subscription", form.values.Subscription);
    if (form.validate().hasErrors) {
      toast.error(`Opps! Something isn't right.`);
      setLoader(false);
    } else {
      try {
        // Send the form data to the server
        const response = await axios.post(Register_API, formData);
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
              Register
            </h2>
          </div>
          <div className=" md:grid grid-cols-2  gap-4">
            <FormInput
              withAsterisk={true}
              label="First name"
              placeHolder="First name"
              icon={<IconUser size="1rem" />}
              inputName="FirstName"
              formProps={form.getInputProps}
              required={true}
            />
            <FormInput
              withAsterisk={true}
              label="Last name"
              placeHolder="Last name"
              icon={<IconUser size="1rem" />}
              inputName="LastName"
              formProps={form.getInputProps}
              required={true}
            />
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
          <FormInput
            withAsterisk={true}
            label="Phone number"
            icon={<IconPhone size="1rem" />}
            type="tel"
            placeHolder="Enter Phone number"
            inputName="Phonenumber"
            formProps={form.getInputProps}
            required={true}
          />
          <FormSelect
            searchable={true}
            formProps={form.getInputProps}
            icon={<IconSelect size="1rem" />}
            placeHolder="Select subscription plan"
            withAsterisk={true}
            inputName="Subscription"
            label="Subscription plan"
            // data={data}
            data={subscriptionPlan}
          />
          {/* Passsword */}
          <div className=" md:grid grid-cols-2  gap-4">
            <FormPassword
              withAsterisk={true}
              label="Password"
              placeHolder="Password"
              icon={<IconKey size="1rem" />}
              inputName="Password"
              formProps={form.getInputProps}
              required={true}
            />
            <FormPassword
              withAsterisk={true}
              label="Confirm Password"
              icon={<IconKey size="1rem" />}
              placeHolder="Confirm Password"
              inputName="CPassword"
              formProps={form.getInputProps}
              required={true}
            />
          </div>
          <div className="flex justify-start items-center">
            <FormCheckBox
              // label=""
              inputName="Checkbox"
              formProps={form.getInputProps}
              required={true}
            />
            <h6 className="mx-2 text-sm">
              I agree to the
              <Link to="/terms" className="mx-1 hover:text-gwltheme">
                terms and condition
              </Link>
            </h6>
          </div>
          <FormButton
            gradient={{ from: buttonTheme.primary, to: buttonTheme.secondary  }}
            text="Register"
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
              Already have an account?
              <Link className="mx-3 hover:text-orange-600" to="/login">
                Login
              </Link>
            </h6>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
