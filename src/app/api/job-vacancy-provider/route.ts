import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db.user.findMany({
      where: { role: "job_vacancy_provider" },
      omit: { password: false },
      include: {
        jobs: true,
        comments: true,
        profile: {
          select: {
            city: true,
            updatedAt: true,
          },
        },
      },
    });

    return NextResponse.json({
      status_code: 200,
      message: "Sukses mendapatkan seluruh perusahaan!",
      data: response,
    });
  } catch (err) {
    return NextResponse.json({
      status_code: 500,
      message: "Gagal mendapatkan seluruh perusahaan!",
    });
  }
}
