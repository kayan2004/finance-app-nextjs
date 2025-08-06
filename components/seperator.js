import React from "react";

const Seperator = ({ props }) => {
  return (
    <hr {...props} className={` my-4 border-gray-200 dark:border-gray-800`} />
  );
};

export default Seperator;
