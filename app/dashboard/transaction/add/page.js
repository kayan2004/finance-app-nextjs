import React from "react";
import TransactionForm from "../../components/transaction-form";

export const metadata = {
  title: "Add transaction",
};
const Page = () => {
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Add transaction</h1>
      <div className="space-y-8">
        <TransactionForm />
      </div>
    </>
  );
};

export default Page;
