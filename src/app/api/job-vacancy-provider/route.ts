import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db.profilCompany.findMany({
      include: {
        jobs: true,
        comments: true,
        user: {
          include: {
            profile: true,
          },
          omit: { password: false },
        },
      },
    });

    return NextResponse.json({
      status_code: 200,
      message: "Sukses mendapatkan data seluruh perusahaan!",
      data: response,
    });
  } catch (err) {
    return NextResponse.json({
      status_code: 500,
      message: "Gagal mendapatkan data seluruh perusahaan!",
    });
  }
}
