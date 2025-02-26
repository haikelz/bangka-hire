import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  await db.profilCompany.create({
    data
  });

  return NextResponse.json({
    status_code: 200,
    message: "Sukses membuat profile perusahaan!",
  });
}
