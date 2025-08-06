export const revalidate = 0;

import TransactionList from "./components/transaction-list";
import { Suspense } from "react";
import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { variants, sizes } from "@/lib/variants";
import { ErrorBoundary } from "react-error-boundary";
import { types } from "@/lib/consts";
import Range from "./components/range";
import TransactionListWrapper from "./components/transaction-list-wrapper";
import { createClient } from "@/lib/supabase/server";
const Page = async ({ searchParams }) => {
  const params = await searchParams;

  const supabase = await createClient();

  const {
    data: {
      user: { user_metadata: settings },
    },
  } = await supabase.auth.getUser();

  const range = params.range ?? settings?.defaultView ?? "last30days";
  return (
    <>
      <div className="space-y-8">
        <section className="flex justify-between items-center gap-20">
          <h1 className="text-4xl font-semibold mr-auto"> Summary</h1>
          <aside>
            <Range defaultView={settings?.defaultView} />
          </aside>
        </section>
        <section className=" grid grid-cols-2 lg:grid-cols-4">
          {types.map((type) => {
            return (
              <ErrorBoundary
                key={type}
                fallback={
                  <div className="text-red-500">
                    Cannot fetch {type} trend data
                  </div>
                }
              >
                <Suspense fallback={<TrendFallback />}>
                  <Trend type={type} range={range}></Trend>
                </Suspense>
              </ErrorBoundary>
            );
          })}
        </section>
        <section className="flex justify-between items-center">
          <h2 className="text-2xl ">Transactions</h2>
          <Link
            href="/dashboard/transaction/add"
            className={`flex items-center space-x-1 ${variants["outline"]} ${sizes["sm"]}`}
          >
            <PlusCircle className="w-4 h-4 " />
            <div>Add</div>
          </Link>
        </section>
      </div>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionListWrapper range={range} />
      </Suspense>
    </>
  );
};

export default Page;
