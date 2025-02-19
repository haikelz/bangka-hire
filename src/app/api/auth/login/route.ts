import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const existingJobApplicant = await db.user.findUnique({
    where: {
      email,
      google_oauth: false,
    },
  });

  if (!existingJobApplicant) {
    return NextResponse.json({
      status_code: 401,
      message: "Nama akun dengan Email ini tidak ditemukan!",
    });
  }

  const matchPassword = await bcrypt.compare(
    password,
    existingJobApplicant?.password as string
  );

  if (!matchPassword) {
    return NextResponse.json({
      status_code: 401,
      message: "Password yang kamu masukkan salah!",
    });
  }

  return NextResponse.json({
    status_code: 200,
    message: "Berhasil login",
  });
}
