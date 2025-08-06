import React from "react";
import { forwardRef } from "react";

export default forwardRef(function Select(props, ref) {
  return (
    <select
      {...props}
      ref={ref}
      className=" border rounded-md w-full shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 px-3 py-2 "
    ></select>
  );
});
