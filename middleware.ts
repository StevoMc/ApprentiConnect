import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/reports"] };

export async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path === "/dashboard") {
    return NextResponse.redirect(new URL("/signin", req.url));
  } else if (session && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/protected", req.url));
  }
  return NextResponse.next();
}
