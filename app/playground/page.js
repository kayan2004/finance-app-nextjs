import UseServerDarkMode from "@/hooks/use-server-dark-mode";

export const metadata = {
  title: "Playground",
};
const Page = () => {
  const theme = UseServerDarkMode();
  return <main className="space-x-8 mb-44"></main>;
};

export default Page;
