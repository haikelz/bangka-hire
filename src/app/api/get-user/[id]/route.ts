import db from "@/lib/db";
import type { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: APIRouteParamsProps) {
  const { id } = await props.params;

  const existingUser = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      full_name: true,
      email: true,
      jobs: true,
      image: true,
      phone_number: true,
      description: true,
      cv: true,
      role: true,
      google_oauth: true,
      profile: true,
    },
  });

  // cek apakah user ada
  if (!existingUser) {
    return NextResponse.json({
      status_code: 404,
      message: "User tidak ditemukan!",
    });
  }

  return NextResponse.json({
    status_code: 200,
    message: "Sukses mendapatkan data user!",
    user: existingUser,
  });
}
