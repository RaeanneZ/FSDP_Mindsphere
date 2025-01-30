import React from "react";

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={`border border-gray-300 px-3 py-2 rounded-md ${className}`}
      {...props}
    />
  );
};

export default Textarea;
