import BaseTrend from "@/components/trend";
import { createClient } from "@/lib/supabase/server";
const Trend = async ({ type, range }) => {
  const supabase = await createClient();
  let { data, error } = await supabase.rpc("calculate_total", {
    type_arg: type,
    range_arg: range,
  });
  if (error) throw new Error("Could not fetch the trend data");
  else console.log(data);

  // const amount = data ?? 0;

  return (
    <BaseTrend
      type={type}
      amount={data[0].current_amount}
      prevAmount={data[0].previous_amount}
    ></BaseTrend>
  );
};

export default Trend;
