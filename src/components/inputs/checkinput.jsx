import { Checkbox } from "@mantine/core";
function FormCheckBox({
  formProps,
  label,
  error,
  disabled,
  required,
  inputName,
}) {
  return (
    <Checkbox      
      label={label}
      error={error}
      {...formProps(inputName)}
      required={required}
      disabled={disabled}
      className="my-2"
      mt="sm"
    />
  );
}
export default FormCheckBox;
