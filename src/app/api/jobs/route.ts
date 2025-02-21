import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// mengambil semua data job di database
export async function GET(req: NextRequest) {
  const page: number = Number(req?.nextUrl?.searchParams.get("page") as string);
  const limit: number = Number(
    req?.nextUrl?.searchParams.get("limit") as string
  );

  const skip = (page - 1) * limit; // menghitung skip

  // ambil data semua lowongan kerja di database
  const data = await db.job.findMany({
    take: limit,
    skip: skip,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      company: {
        select: {
          user: {
            select: {
              full_name: true, // mengambil nama perusahaan
            },
          },
          city: true, // mengambil kota perusahaan seperti pangkal pinang, sungailiat
        },
      },
    },
  });

  const totalItems = await db.job.count(); // menghitung total item
  const totalPages = Math.ceil(totalItems / limit); // menghitung total halaman

  return NextResponse.json({
    status_code: 200,
    message: "Berhasil mendapatkan data lowongan kerja!",
    data,
    totalItems,
    totalPages,
    currentPage: page,
  });
}
