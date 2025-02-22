import { createSession } from "@/app/actions";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
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
