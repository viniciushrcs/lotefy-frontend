import { NextRequest, NextResponse } from "next/server";

const AUTH_PATHS = [
  "/",
  "/profile",
  "/enterprise",
  "/dashboard",
  "/venture-registration",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("LotefyAPI.token")?.value;

  const path = request.nextUrl.pathname;

  if (!token && AUTH_PATHS.includes(path)) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  if (path === "/") {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/:path*"],
};
