import React from "react";
import { createClient } from "@/lib/supabase/server";
import TransactionList from "./transaction-list";
import { fetchTransactions } from "@/lib/actions";

const TransactionListWrapper = async ({ range }) => {
  console.log("TransactionListWrapper - range:", range);

  const transactions = await fetchTransactions(range);

  console.log("TransactionListWrapper - fetched transactions:", transactions);
  console.log(
    "TransactionListWrapper - is array:",
    Array.isArray(transactions)
  );

  return (
    <TransactionList
      initialTransactions={transactions}
      key={range}
      range={range}
    />
  );
};

export default TransactionListWrapper;
