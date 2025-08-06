import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Button from "./button";
import { CircleUser, KeyRound } from "lucide-react";
import DarkModeToggleWrapper from "./dark-mode-toggle-wrapper";
import { sizes, variants } from "@/lib/variants";
import SignoutButton from "./signout-button";
import Avatar from "./avatar";
const PageHeader = async ({ className, defaultTheme }) => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        {" "}
        Finance App
      </Link>
      <div className="flex items-center space-x-4">
        <DarkModeToggleWrapper defaultTheme={defaultTheme} />
        {user && (
          <Link
            href="/dashboard/settings"
            className={`flex items-center space-x-1 ${variants["ghost"]} ${sizes["sm"]}`}
          >
            <Avatar />

            <span>{user?.user_metadata?.fullName ?? user?.email}</span>
          </Link>
        )}
        {!user && (
          <Link href="/login" className={`${variants["ghost"]} ${sizes["sm"]}`}>
            <KeyRound className="w-4 h-4" />
          </Link>
        )}
        <SignoutButton></SignoutButton>
      </div>
    </header>
  );
};

export default PageHeader;
