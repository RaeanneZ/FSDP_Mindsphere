import React from "react";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`border border-gray-300 px-3 py-2 rounded-md ${className}`}
      {...props}
    />
  );
};

export default Input;
