import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";



export function middleware(request : NextRequest) {
  const { nextUrl } = request
  const authToken = request.cookies.get("auth-token");
  const isLogin = !!authToken
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");


  // redirect ke home jika sudah login
  if (isAuthPage && isLogin) {
    // redirect ke home
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      const tokenData = JSON.parse(atob(authToken.value));
      const expirationDate = new Date(tokenData.expires);

      if (expirationDate < new Date()) {
        const response = NextResponse.redirect(
          new URL("/auth/login", request.url)
        );
        response.cookies.delete("auth-token");
        return response;
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
    "/auth/:path*"
  ],
};
