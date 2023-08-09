import { PasswordInput } from "@mantine/core";
// import { MdVisibility, MdVisibilityOff } from "react-icons/md";
function FormPassword({
  formProps,
  label,
  withAsterisk,
  error,
  disabled,
  radius,
  description,
  required,
  placeHolder,
  inputName,
  icon
}) {
  return (
    <PasswordInput
      required={required}
      withAsterisk={withAsterisk}
      label={label}
      icon={icon}
      className="my-2"
      error={error}
      description={description}
      placeholder={placeHolder}
      {...formProps(inputName)}
      radius={radius}
      disabled={disabled}
      // visibilityToggleIcon={({ reveal, size }) =>
      //   reveal ? <MdVisibility /> : <MdVisibilityOff />
      // }
    />
  );
}

export default FormPassword;
