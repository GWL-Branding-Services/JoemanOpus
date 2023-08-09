import { isEmail, useForm } from "@mantine/form";
import { useState } from "react";
import { FormInput } from "../../components/inputs";
import { FormButton } from "../../components/buttons";
import { useNavigate } from "react-router-dom";
import { IconAt } from "@tabler/icons-react";
import axios from "axios";
import { Forgot_API } from "../../API/API";
import { toast } from "react-toastify";
import { buttonTheme } from "../../Data/GeneralData";

function ForgotPassword() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      Email: "",
    },
    validate: {
      Email: isEmail("Invalid email"),
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.validate();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 7500);
    if (form.validate().hasErrors) {
      toast.error(`Opps! Something isn't right.`);
      setLoader(false);
    } else {
      try {
        // Send the form data to the server
        const response = await axios.post(Forgot_API, {
          email: form.values.Email,
        });
        console.log(response);
        if (response.data.status === true) {
          toast.success(response.data.message);

          setLoader(false);
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
      <div className=" h-auto mt-3 mb-9 flex justify-center items-center">
        <form
          className="w-96  md:px-9 h-auto container m-4"
          onSubmit={handleSubmit}
        >
          <div className="text-center mt-2  ">
            <h2 className="font-bold tracking-tighter  my-9 text-gwltheme-light text-3xl">
              Recover Password
            </h2>
          </div>
          <div className=" mb-5">
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
          </div>
          <FormButton
            gradient={{ from: buttonTheme.primary, to: buttonTheme.secondary }}
            text="Send reset link"
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

export default ForgotPassword;
