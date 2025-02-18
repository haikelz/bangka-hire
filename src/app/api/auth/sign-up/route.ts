import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../[...nextauth]/options";

export async function POST(req: NextRequest) {
  const session = await getServerSession(options());

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
