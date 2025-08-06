import Skeleton from "@/components/skeleton";
import React from "react";

const TrendFallback = () => {
  return (
    <div className="space-y-5 w-3/5 lg:w-5/6">
      <div>
        <Skeleton />
      </div>
      <div className={`t mb-2`}>
        <Skeleton />
      </div>
      <div className="flex space-x-2 ">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};

export default TrendFallback;
