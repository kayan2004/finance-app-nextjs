import { NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { createClient } from "./lib/supabase/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    Response.redirect(new URL("/login", request.url));
  }
  if (user && request.nextUrl.pathname.startsWith("/login")) {
    Response.redirect(new URL("/dashboard", request.url));
  }
  return await updateSession(request);
}

export const config = {
  matcher: "/",
};
