import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { full_name, phone_number, email, password, confirm_password } =
    await req.json();

  const existingJobApplicant = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingJobApplicant) {
    return NextResponse.json({
      status_code: 400,
      message: "Email yang kamu masukkan sudah terdaftar!",
    });
  }

  // pengecekan password dan confirm password
  if (password !== confirm_password) {
    return NextResponse.json({
      status_code: 400,
      message: "Konfirmasi Password yang kamu masukkan tidak sama!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await db.user.create({
    data: {
      full_name,
      phone_number,
      email,
      password: hashedPassword,
      role: "job_applicant",
    },
  });

  await createSession(data);

  return NextResponse.json({
    status_code: 200,
    message: "Berhasil membuat akun!",
  });
}

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
