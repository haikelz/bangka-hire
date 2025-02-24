import db from "@/lib/db";
import { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: APIRouteParamsProps) {
  const { id } = await props.params;

  try {
    const response = await db.user.findUnique({
      where: { role: "job_vacancy_provider", id },
      omit: {
        password: false,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        profile: true,
        jobs: {
          where: {
            user_id: id,
          },
        },
      },
    });

    return NextResponse.json({
      status_code: 200,
      message: "Sukses mendapatkan data perusahaan!",
      data: response,
    });
  } catch (error) {
    return NextResponse.json({
      status_code: 500,
      message: "Gagal mendapatkan data perusahaan!",
    });
  }
}
