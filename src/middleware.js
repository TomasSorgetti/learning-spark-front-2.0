import { NextResponse } from "next/server";

export function middleware(req) {
  const cookie = req.cookies.get("isAuthenticated");
  const isAuthenticated = cookie ? cookie.value === "true" : false;

  if (isAuthenticated && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && req.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/auth/:path*", "/profile"] };
