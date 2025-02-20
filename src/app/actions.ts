import { cookies } from "next/headers";

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
