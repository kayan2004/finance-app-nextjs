import React from "react";

const Label = (props) => {
  return (
    <label
      {...props}
      className={`block ${props.className} text-gray-700 dark:text-gray-300`}
    ></label>
  );
};

export default Label;
