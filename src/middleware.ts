import { decode } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_EMAIL, ADMIN_PASSWORD, NODE_ENV } from "./lib/constants";

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

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

  // di cek kalau user belum login dan mau akses halaman auth
  if (
    !isLogin &&
    !isLoginGoogle &&
    ["/dashboard", "/profile"].some((path) =>
      request.nextUrl.pathname.startsWith(path)
    )
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // di cek kalau user belum login dan mau akses halaman dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    try {
      if (!isLogin && !isLoginGoogle) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      // Redirect user logged in with Google to homepage if his/her role are not "job_vacancy_provider"
      if (authTokenGoogle) {
        const decodedGoogleToken = await decode({
          token: authTokenGoogle?.value,
          secret: process.env.NEXTAUTH_SECRET as string,
        });

        if (decodedGoogleToken?.role !== "job_vacancy_provider") {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }

      if (authToken) {
        const tokenData = JSON.parse(atob(authToken?.value as string));
        const expirationDate = new Date(tokenData.expires);

        if (
          tokenData.user.role !== "job_vacancy_provider" &&
          tokenData.user.role !== "admin"
        ) {
          return NextResponse.redirect(new URL("/", request.url));
        }

        // Don't accept the users who has role other than admin, and not matched email && password
        if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
          if (
            tokenData.user.email !== ADMIN_EMAIL ||
            tokenData.user.password !== ADMIN_PASSWORD ||
            tokenData.user.role !== "admin"
          ) {
            return NextResponse.redirect(new URL("/", request.url));
          } else {
            return NextResponse.next({ headers });
          }
        }

        if (expirationDate < new Date()) {
          const response = NextResponse.redirect(
            new URL("/auth/login", request.url)
          );
          response.cookies.delete("auth-token");
          return response;
        }
      } else if (authTokenGoogle) {
        // In admin role, we don't use Google login, only using email and password
        // So, we can redirect the user who logged in with Google to homepage
        if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
    "/auth/:path*",
  ],
};
