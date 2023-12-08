import React from "react";

const sizeClasses = {
  txtInterBold50: "font-bold font-inter",
  txtInterBold40: "font-bold font-inter",
  txtInterMedium20WhiteA700b2: "font-inter font-medium",
  txtInterMedium20: "font-inter font-medium",
  txtInterRegular10: "font-inter font-normal",
  txtSoraSemiBold28: "font-semibold font-sora",
  txtInterRegular16WhiteA700cc: "font-inter font-normal",
  txtInterMedium24: "font-inter font-medium",
  txtInterRegular24: "font-inter font-normal",
  txtInterBold16: "font-bold font-inter",
  txtInterRegular16: "font-inter font-normal",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
