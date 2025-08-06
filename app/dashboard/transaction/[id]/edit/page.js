import { createClient } from "@/lib/supabase/server";
import TransactionForm from "@/app/dashboard/components/transaction-form";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Edit transaction",
};
const Page = async ({ params: { id } }) => {
  const supabase = await createClient();
  let { data: transaction, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();
  if (error) notFound();
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Edit transaction</h1>
      <div className="space-y-8">
        <TransactionForm initialData={transaction} />
      </div>
    </>
  );
};

export default Page;
