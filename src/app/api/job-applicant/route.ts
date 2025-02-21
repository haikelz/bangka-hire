import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// mengambil semua data job di database
export async function POST(req: NextRequest, props: Props) {
  try {
    const page: number = Number(
      req?.nextUrl?.searchParams.get("page") as string
    );

    const limit = 8; // jumlah item perhalaman kel ambik 8 bai ok
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

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    return NextResponse.json({
      status_code: 500,
      message: "Gagal mengambil data lowongan kerja",
    });
  }
}
