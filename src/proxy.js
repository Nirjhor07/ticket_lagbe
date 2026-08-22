import { NextResponse } from "next/server";
import { getUserSession } from "./lib/core/getUserSession";

// Export the function exactly as 'proxy' to satisfy Next.js requirements
export async function proxy(request) {
  // Await the session if your session fetching logic is asynchronous
  const session = await getUserSession();

  // Redirect to login if no active session is found
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Proceed with the request if the user is authenticated
  return NextResponse.next();
}

export const config = {
  // The asterisk (*) ensures it matches all nested paths under listings
  matcher: "/dashboard",
  // matcher: ["/user/listings", "/user/bookings", "/user/addroom"],
};
