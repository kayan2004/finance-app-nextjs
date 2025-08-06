import Skeleton from "@/components/skeleton";
import React from "react";

const TransactionItemSkeleton = () => {
  return (
    <div className="w-full flex items-center space-x-4">
      <div className="flex items-center mr-4 grow">
        <Skeleton />
      </div>
      <div className="min-w-[150px] items-center hidden md:flex">
        <Skeleton />
      </div>
      <div className="min-w-[70px] text-right">
        <Skeleton />
      </div>
      <div className="min-w-[50px] flex justify-end">
        <Skeleton />
      </div>
    </div>
  );
};

const TransactionSummaryItemSkeleton = () => {
  return (
    <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
      <div className="grow ">
        <Skeleton />
      </div>
      <div className="min-w-[70px] text-right font-semibold">
        <Skeleton />
      </div>
    </div>
  );
};

const TransactionListFallback = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <TransactionSummaryItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </div>
      <div className="space-y-4">
        <TransactionSummaryItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </div>
    </div>
  );
};

export default TransactionListFallback;
