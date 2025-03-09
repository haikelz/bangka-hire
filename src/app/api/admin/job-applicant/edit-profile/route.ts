import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  let { full_name, phone_number, user_id, description, email } =
    await req.json();

  const existingJobApplicant = await db.user.findUnique({
    where: {
      id: user_id,
      role: "job_applicant",
    },
  });

  // pengecekan bila user tidak ada di database
  if (!existingJobApplicant) {
    return NextResponse.json({
      status_code: 400,
      message: "User tidak ditemukan!",
    });
  }

  // jika description kosong pakai description lama
  if (!description) {
    description = existingJobApplicant.description;
  }

  // jika full_name kosong pakai full_name lama
  if (!full_name) {
    full_name = existingJobApplicant.full_name;
  }

  // jika phone_number kosong pakai phone_number lama
  if (!phone_number) {
    phone_number = existingJobApplicant.phone_number;
  }

  // jika email kosong pakai email lama
  if (!email) {
    email = existingJobApplicant.email;
  }

  // update data user
  await db.user.update({
    where: {
      id: user_id,
    },
    data: {
      full_name,
      phone_number,
      description,
      email,
    },
  });

  return NextResponse.json({
    status_code: 200,
    message: "Berhasil merubah data profile!",
  });
}
