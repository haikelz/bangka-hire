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
    email
  } = await req.json();

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

  // jika email kosong pakai email lama
  if (!email) {
    email = existingJobVacancyProvider.email;
  }

  // jika full_name kosong pakai full_name lama
  if (!full_name) {
    full_name = existingJobVacancyProvider.full_name;
  }

  // jika company_type kosong pakai company_type lama
  if (!company_type) {
    company_type = existingJobVacancyProvider.profile?.company_type;
  }

  // jika total_employers kosong pakai total_employers lama
  if (!total_employers) {
    total_employers = existingJobVacancyProvider.profile?.total_employers;
  }

  // jika city kosong pakai city lama
  if (!city) {
    city = existingJobVacancyProvider.profile?.city;
  }


  await db.profilCompany.update({
    where: {
      user_id,
    },
    data: {
      user: {
        update: {
          full_name,
          email
        },
      },
      company_type,
      total_employers,
      description_company,
      city,
      street,
    },
  });

  return NextResponse.json({
    status_code: 200,
    message: "Berhasil merubah data profile!",
  });
}
