import { cookies } from "next/headers";

const UseServerDarkMode = async (defaultTheme = "dark") => {
  const cookieStore = await cookies();
  return cookieStore.get("theme")?.value ?? defaultTheme;
};

export default UseServerDarkMode;
