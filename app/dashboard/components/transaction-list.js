"use client";
import Seperator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import React, { useState } from "react";
import { groupAndSumTransactionsByDate } from "@/lib/utils";
import Button from "@/components/button";
import { fetchTransactions } from "@/lib/actions";
import { Loader } from "lucide-react";
const TransactionList = ({ initialTransactions, range }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [loading, setLoading] = useState(false);
  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0
  );
  const grouped = groupAndSumTransactionsByDate(transactions);

  const handleClick = async (e) => {
    let nextTransactions = null;
    try {
      setLoading(true);
      nextTransactions = await fetchTransactions(
        range,
        transactions.length,
        10
      );
    } finally {
      setLoading(false);
    }
    setButtonHidden(nextTransactions.length === 0);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      ...nextTransactions,
    ]);
  };

  const handleRemoved = (id) => () => {
    setTransactions((prev) => [...prev].filter((t) => t.id !== id));
  };
  return (
    <>
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date} className="space-y-8">
          <TransactionSummaryItem date={date} amount={amount} />
          <Seperator></Seperator>
          <section className="space-y-4">
            {transactions.map((transaction) => {
              return (
                <div key={transaction.id}>
                  <TransactionItem
                    {...transaction}
                    onRemoved={handleRemoved(transaction.id)}
                  />
                </div>
              );
            })}
          </section>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500">
          No transactions found
        </div>
      )}
      <div className={`justify-center ${buttonHidden ? "hidden" : "flex"} `}>
        <Button variant="ghost" onClick={handleClick} disabled={loading}>
          <div className="flex items-center space-x-1">
            {loading && <Loader />}
            <div>Load More</div>
          </div>
        </Button>
      </div>
    </>
  );
};

export default TransactionList;
