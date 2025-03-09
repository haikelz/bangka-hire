import { ADMIN_EMAIL, ADMIN_PASSWORD, NODE_ENV } from "@/lib/constants";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

/**
 * A function to create new session with 7 days of expiration date
 * Why this function placed in this file? Because the cookies utility from next/server require server side
 * @param data
 */
export async function createSession<T>(data: T): Promise<void> {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const sessionData = {
    user: data,
    expires: expirationDate.toISOString(),
  };

  (await cookies()).set("auth-token", btoa(JSON.stringify(sessionData)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expirationDate,
    path: "/",
  });
}

type AvailableAuthTokenProps = {
  isExpired: boolean;
  isAvailable: boolean;
};

export function checkAvailableAuthToken(
  req: NextRequest
): AvailableAuthTokenProps {
  const authToken = req.cookies.get("auth-token");

  const authTokenGoogle = req.cookies.get(
    NODE_ENV === "development"
      ? "next-auth.session-token"
      : "__Secure-next-auth.session-token"
  );

  if (authTokenGoogle) {
    return {
      isExpired: false,
      isAvailable: true,
    };
  }

  if (!authToken && !authTokenGoogle) {
    return {
      isExpired: false,
      isAvailable: false,
    };
  }

  const tokenData = JSON.parse(atob(authToken?.value as string));
  const expirationDate = new Date(tokenData.expires);

  if (expirationDate < new Date()) {
    return {
      isExpired: true,
      isAvailable: false,
    };
  }

  return {
    isExpired: false,
    isAvailable: true,
  };
}

export function checkAvailableAdminAuthToken(
  req: NextRequest
): AvailableAuthTokenProps {
  const authToken = req.cookies.get("auth-token");

  if (!authToken) {
    return {
      isExpired: false,
      isAvailable: false,
    };
  }

  const tokenData = JSON.parse(atob(authToken?.value as string));
  const expirationDate = new Date(tokenData.expires);

  if (expirationDate < new Date()) {
    return {
      isExpired: true,
      isAvailable: false,
    };
  }

  if (
    tokenData.user.role !== "admin" ||
    tokenData.user.email !== ADMIN_EMAIL ||
    tokenData.user.password !== ADMIN_PASSWORD
  ) {
    return {
      isExpired: false,
      isAvailable: false,
    };
  }

  return {
    isExpired: false,
    isAvailable: true,
  };
}
