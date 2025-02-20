import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password, full_name, email, phone_number } = await req.json();

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

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        full_name,
        phone_number,
        email,
        role: "job_applicant",
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      status_code: 200,
      message: "Berhasil membuat akun!",
    });
  } catch (err) {
    return NextResponse.json({
      status_code: 500,
      message: "Sepertinya ada kesalahan disisi server!",
    });
  }
}
