import db from "@/lib/db";
import { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: APIRouteParamsProps) {
  // ambil id dari params
  const { id } = await props.params;

  // cek dulu apakah user ini memiliki role job_vacancy_provider
  const existingUserJobVacancyProvider = await db.user.findUnique({
    where: {
      id: id,
      role: "job_vacancy_provider",
    },
  });

  if (!existingUserJobVacancyProvider) {
    return NextResponse.json({
      status_code: 404,
      message: "Anda Bukan Job Vacancy Provider!",
    });
  }

  // kemudian cek dulu apakah user ini memiliki profile
  const existingProfileJobVacancyProvider = await db.profilCompany.findUnique({
    where: {
      user_id: id,
    },
  });

  // kembalikan nilai true / false
  return NextResponse.json({ exists: !!existingProfileJobVacancyProvider });
}
