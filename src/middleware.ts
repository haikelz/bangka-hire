// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a route that should trigger the storing of previous URL
  if (pathname.startsWith("/auth/sign-up")) {
    let url = "/auth/sign-up";

    const response = NextResponse.next();
    response.cookies.set("sign-up-url", url, {
      path: "/auth/sign-up",
      httpOnly: true,
      maxAge: 60 * 5, // 5 minutes expiration
      sameSite: "lax",
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/sign-up"],
};
