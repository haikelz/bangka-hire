import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const existingJobApplicant = await db.users.findUnique({
    where: {
      email,
      google_oauth: false,
    },
  });

  if (existingJobApplicant) {
    return NextResponse.json({
      status_code: 200,
      message: "Berhasil login",
    });
  } else {
    return NextResponse.json({
      status_code: 400,
      message: "Akun tidak ditemukan!",
    });
  }
}
