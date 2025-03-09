import { checkAvailableAuthToken } from "@/app/actions";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  let {
    full_name,
    user_id,
    company_type,
    description_company,
    city,
    street,
    total_employers,
    social_media,
  } = await req.json();

  const isAvailableAuthToken = checkAvailableAuthToken(req);

  if (!isAvailableAuthToken.isAvailable || isAvailableAuthToken.isExpired) {
    return NextResponse.json({
      status_code: 401,
      message: "Unauthorized!",
    });
  }

  const existingJobVacancyProvider = await db.user.findUnique({
    where: {
      id: user_id,
      role: "job_vacancy_provider",
    },
    include: {
      profile: true,
    },
  });

  // pengecekan bila user tidak ada di database
  if (!existingJobVacancyProvider) {
    return NextResponse.json({
      status_code: 400,
      message: "User tidak ditemukan!",
    });
  }

  // jika description kosong pakai description lama
  if (!description_company) {
    description_company = existingJobVacancyProvider.description;
  }

  // jika full_name kosong pakai full_name lama
  if (!full_name) {
    full_name = existingJobVacancyProvider.full_name;
  }

  await db.profilCompany.update({
    where: {
      user_id,
    },
    data: {
      user: {
        update: {
          full_name,
        },
      },
      company_type,
      total_employers,
      description_company,
      linkedin: social_media.linkedin,
      instagram: social_media.instagram,
      facebook: social_media.facebook,
      gmail: social_media.gmail,
      city,
      street,
    },
  });

  return NextResponse.json({
    status_code: 200,
    message: "Berhasil merubah data profile!",
  });
}
