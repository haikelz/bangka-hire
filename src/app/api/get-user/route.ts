import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.user.findMany({
    where: {
      role: "job_applicant",
    }
  });

  return NextResponse.json({
    status_code: 200,
    message: "Sukses mendapatkan data seluruh pelamar kerja!",
    data,
  });
}
