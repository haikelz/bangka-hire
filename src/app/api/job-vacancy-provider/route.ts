import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchCompany = req?.nextUrl?.searchParams.get("search") as string;
    const page: number = Number(
      req?.nextUrl?.searchParams.get("page") as string
    );
    const limit: number = Number(
      req?.nextUrl?.searchParams.get("limit") as string
    );

    const skip = (page - 1) * limit; // menghitung skip

    const data = await db.profilCompany.findMany({
      take: limit,
      skip: skip,
      where: {
        user: {
          full_name: {
            contains: searchCompany,
            mode: "insensitive",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        jobs: true,
        comments: true,
        user: {
          include: {
            profile: true,
          },
          omit: { password: false },
        },
      },
    });

    const totalItems = await db.profilCompany.count({
      where: {
        user: {
          full_name: {
            contains: searchCompany,
          },
        },
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      status_code: 200,
      message: "Sukses mendapatkan data seluruh perusahaan!",
      data,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    return NextResponse.json({
      status_code: 500,
      message: "Gagal mendapatkan data seluruh perusahaan!",
    });
  }
}
