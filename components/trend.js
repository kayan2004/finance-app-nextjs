import React, { useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import useFormatCurrency from "@/hooks/use-format-currency";

const Trend = ({ type, amount, prevAmount }) => {
  const colorClasses = {
    Income: "text-green-400 dark:text-green-300",
    Expense: "text-red-400 dark:text-red-300",
    Investment: "text-indigo-400 dark:text-indigo-300",
    Saving: "text-yellow-400 dark:text-yellow-300",
  };
  const calculatePercantageChange = (amount, prevAmount) => {
    if (!prevAmount || !amount || prevAmount === 0) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  };

  const percantageChange = useMemo(
    () => calculatePercantageChange(amount, prevAmount).toFixed(2),
    [amount, prevAmount]
  );

  const formattedAmount = useFormatCurrency(amount);

  return (
    <div>
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
      <div className={`text-2xl font-semibold text-black dark:text-white mb-2`}>
        {formattedAmount}
      </div>
      <div className="flex space-x-1 items-center text-sm">
        {percantageChange <= 0 && (
          <ArrowDownLeft className="text-red-700 dark:text-red-300" />
        )}
        {percantageChange >= 0 && (
          <ArrowUpRight className="text-green-700 dark:text-green-300" />
        )}
        <div>{percantageChange}% vs last period</div>
      </div>
    </div>
  );
};

export default Trend;
