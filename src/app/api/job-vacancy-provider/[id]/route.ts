import db from "@/lib/db";
import type { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: APIRouteParamsProps) {
  const { id } = await props.params;

  try {
    const response = await db.profilCompany.findUnique({
      where: { id },
      include: {
        jobs: {
          include: {
            company: {
              include: {
                user: { omit: { password: false } },
              },
            },
            users: true,
          },
        },
        comments: {
          include: {
            user: { omit: { password: false } },
          },
        },
        user: {
          omit: {
            password: false,
          },
          include: {
            profile: true,
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
