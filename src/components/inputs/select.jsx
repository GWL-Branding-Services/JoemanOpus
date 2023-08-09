import { Select } from '@mantine/core';

function FormSelect({data, formProps,
    label,
    withAsterisk,
    error,
    disabled,
    radius,
    description,
    placeHolder,
    searchable,
    icon,
    required,
    inputName,}) {

  return  <>
  <Select
  withAsterisk={withAsterisk}
  required={required}
  label={label}
  icon={icon}
  error={error}
  className='my-2'
  searchable={searchable}
  nothingFound="No options"
  description={description}
  placeholder={placeHolder}
  {...formProps(inputName)}
  radius={radius} 
  maxDropdownHeight={280}
  disabled={disabled}   
  data={data} />
 
  </>
  
}
export default FormSelect;
