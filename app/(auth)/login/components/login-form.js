"use client";
import { login } from "@/lib/actions";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { useActionState } from "react";

const initialState = {
  message: "",
};
const LoginForm = () => {
  const [state, formAction] = useActionState(login, initialState);
  return (
    <form action={formAction} className="space-y-2">
      <Input
        type="email"
        placeholder="name@example.com"
        name="email"
        required
      />
      <SubmitButton type="submit" className="w-full" sizes="sm">
        Sign in with email
      </SubmitButton>
      <p
        className={` ${
          state?.error ? "text-red-500" : "text-green-500"
        } text-sm text-center `}
      >
        {state?.message}
      </p>
    </form>
  );
};

export default LoginForm;
