import { TextInput } from "@mantine/core";

function FormInput({
  formProps,
  label,
  withAsterisk,
  error,
  disabled,
  radius,
  type,
  description,
  placeHolder,
  defaultValue,
  hidden,
  icon,
  value,
  width,
  required,
  className,
  onChange,
  inputName,
}) {
  return (
    <TextInput
      className={className}
      width={width}
      withAsterisk={withAsterisk}
      label={label}
      value={value}
      type={type}
      hidden={hidden}
      icon={icon}
      onChange={onChange}
      defaultValue={defaultValue}
      error={error}
      description={description}
      placeholder={placeHolder}
      {...formProps(inputName)}
      radius={radius}
      required={required}
      disabled={disabled}
    />
  );
}

export default FormInput;
