import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  (await cookies()).set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // expired cookie nya
    path: "/",
  });

  // Cek apakah sedang di production (pakai HTTPS)
  const isProduction = process.env.NODE_ENV === "production";

  // Tentukan nama cookie berdasarkan mode
  const cookieName = isProduction
    ? "_Secure-next-auth.session-token"
    : "next-auth.session-token";

  // hapus next auth token
  (await cookies()).set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // expired cookie nya
    path: "/",
  });

  return NextResponse.json({
    status_code: 200,
    message: "Logout berhasil!",
  });
}
