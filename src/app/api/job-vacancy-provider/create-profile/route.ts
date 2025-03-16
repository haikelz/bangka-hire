import { checkAvailableAuthToken } from "@/app/actions";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const isAvailableAuthToken = checkAvailableAuthToken(req);

  if (!isAvailableAuthToken.isAvailable || isAvailableAuthToken.isExpired) {
    return NextResponse.json({
      status_code: 401,
      message: "Unauthorized!",
    });
  }

  await db.profilCompany.create({
    data,
  });

  return NextResponse.json({
    status_code: 200,
    message: "Sukses membuat profile perusahaan!",
  });
}
