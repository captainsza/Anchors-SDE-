import React from "react";
import PropTypes from "prop-types";

const shapes = { round: "rounded-[22px]" };
const variants = {
  outline: {
    white_A700_7f: "border border-solid border-white-A700_7f text-white-A700",
  },
  fill: {
    gray_600: "bg-gray-600 text-white-A700",
    white_A700: "bg-white-A700 shadow-bs text-black-900_01",
    red_A700: "bg-red-A700 shadow-bs1 text-white-A700",
  },
};
const sizes = { xs: "p-1", sm: "p-[9px]" };

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "sm",
  variant = "outline",
  color = "white_A700_7f",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["outline", "fill"]),
  color: PropTypes.oneOf([
    "white_A700_7f",
    "gray_600",
    "white_A700",
    "red_A700",
  ]),
};

export { Button };
