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
  } = await req.json();

  await db.profilCompany.create({
    data: {
      user_id,
      company_type,
      description_company,
      city,
      street,
      total_employers,
    },
  });

  return NextResponse.json({
    status_code: 200,
    message: "Sukses membuat profile perusahaan!",
  });
}
