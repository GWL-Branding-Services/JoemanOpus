/* eslint-disable react/prop-types */
import { Button } from "@mantine/core";

function FormButton({
  text,
  disabled,
  variant,
  loaderPosition,
  rightIcon,
  onClick,
  leftIcon,
  color,
  gradient,
  radius,
  fullWidth,
  size,
  ClassName,
  px,
  loading,
}) {
  return (
    <Button
    className={ClassName}
    gradient={gradient}
    color={color}
    px={px}
      variant={variant}
      disabled={disabled}
      fullWidth={fullWidth}
      leftIcon={leftIcon}
      radius={radius}
      rightIcon={rightIcon}
      onClick={onClick}
      loading={loading}
      loaderPosition={loaderPosition}
      type=""
      size={size}
    >
      {text}
    </Button>
  );
}

export default FormButton;
