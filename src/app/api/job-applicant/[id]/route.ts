import db from "@/lib/db";
import { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: APIRouteParamsProps) {
  try {
    const { id } = await props.params;

    const response = await db.user.findMany({
      where: {
        id,
        role: "job_applicant",
      },
      omit: {
        password: false,
      },
    });

    return NextResponse.json({
      status_code: 200,
      message: "Sukses mendapatkan pelamar kerja!",
      data: response,
    });
  } catch (err) {
    return NextResponse.json({
      status_code: 500,
      message: "Gagal mendapatkan data pelamar kerja!",
    });
  }
}
