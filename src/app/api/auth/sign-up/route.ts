import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { full_name, phone_number, email, password } = await req.json();

  const existingJobApplicant = await db.job_applicant.findUnique({
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

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.job_applicant.create({
    data: {
      full_name,
      phone_number,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    status_code: 200,
    message: "Berhasil membuat akun!",
  });
}
