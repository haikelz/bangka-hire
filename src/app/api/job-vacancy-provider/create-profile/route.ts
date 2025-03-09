import { checkAvailableAuthToken } from "@/app/actions";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
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

  await db.profilCompany.create({
    data: {
      user_id,
      company_type,
      description_company,
      city,
      street,
      total_employers,
      linkedin: social_media.linkedin,
      facebook: social_media.facebook,
      instagram: social_media.instagram,
      gmail: social_media.gmail,
    },
  });

  return NextResponse.json({
    status_code: 200,
    message: "Sukses membuat profile perusahaan!",
  });
}
