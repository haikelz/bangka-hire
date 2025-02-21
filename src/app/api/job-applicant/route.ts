import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db.user.findMany({
      where: { role: "job_applicant" },
      omit: { password: false },
    });

    return NextResponse.json({
      status_code: 200,
      message: "Sukses mendapatkan data seluruh pelamar kerja!",
      data: response,
    });
  } catch (err) {
    return NextResponse.json({
      status_code: 500,
      message: "Gagal mendapatkan data seluruh pelamar kerja!",
    });
  }
}
