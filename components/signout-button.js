"use client";
import { signout } from "@/lib/actions";
import SubmitButton from "./submit-button";
import { LogOut } from "lucide-react";

const SignoutButton = () => {
  return (
    <form action={signout}>
      <SubmitButton variant="ghost" size="sm">
        <LogOut className="w-6 h-6" />
      </SubmitButton>
    </form>
  );
};

export default SignoutButton;
