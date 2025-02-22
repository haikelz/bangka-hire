import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { NODE_ENV } from "./lib/constants";

const AuthRouters =[
  "/auth/:path*",
  "/profile",
  "/profile/:path*",
  "/dashboard"
]

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token");
  const isLogin = !!authToken;

  // khusus yang login lewat akun google ni kel
  // Detect the condition of Website("development" || "production")
  // Why using this approach? Because the default name next-auth token between development and production are different
  // @see https://next-auth.js.org/v3/configuration/options#jwt-helper
  const authTokenGoogle = request.cookies.get(
    NODE_ENV === "development"
      ? "next-auth.session-token"
      : "__Secure-next-auth.session-token"
  );
  const isLoginGoogle = !!authTokenGoogle;

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  // redirect ke home jika sudah login
  if (isAuthPage && (isLogin || isLoginGoogle)) {
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
    "/auth/:path*",
  ],
};
