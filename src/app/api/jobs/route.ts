import db from "@/lib/db";
import { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// mengambil semua data job di database
export async function GET(req: NextRequest, props: APIRouteParamsProps) {
  try {
    const search = req?.nextUrl?.searchParams.get("search") as string;
    const city = req?.nextUrl?.searchParams.get("city") as string;
    const salary = req?.nextUrl?.searchParams.get("salary") as string;

    const page: number = Number(
      req?.nextUrl?.searchParams.get("page") as string
    );
    const limit: number = Number(
      req?.nextUrl?.searchParams.get("limit") as string
    );
    const companyId = req?.nextUrl?.searchParams.get("companyId") as string;

    const skip = (page - 1) * limit; // menghitung skip

    // ambil data semua lowongan kerja di database
    const data = await db.job.findMany({
      take: limit,
      skip: skip,
      where: {
        AND: [
          search
            ? {
                OR: [
                  {
                    position_job: {
                      contains: search, // mencari lowongan kerja berdasarkan posisi
                      mode: "insensitive",
                    },
                  },
                  {
                    company: {
                      user: {
                        full_name: {
                          contains: search, // mencari lowongan kerja berdasarkan nama perusahaan
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                ],
              }
            : {},
          city
            ? {
                company: {
                  city: {
                    contains: city,
                    mode: "insensitive",
                  },
                },
              }
            : {},
          salary === "Tertinggi" ? { salary_max: { gt: 0 } } : {},
          salary === "Terendah" ? { salary_max: { gt: 1 } } : {},
          companyId
            ? {
                company_id: {
                  contains: companyId,
                  mode: "insensitive",
                },
              }
            : {}
        ],
      },
      orderBy: salary
        ? {
            salary_max: salary === "Tertinggi" ? "desc" : "asc",
          }
        : { createdAt: "desc" }, // secara default akan di urutkan dari terbaru
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

    // menhitung total items jika memang sudah di filter
    const totalItems = await db.job.count({
      where: {
        AND: [
          search
            ? {
                OR: [
                  {
                    position_job: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    company: {
                      user: {
                        full_name: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                ],
              }
            : {},
          city
            ? {
                company: {
                  city: {
                    contains: city,
                    mode: "insensitive",
                  },
                },
              }
            : {},
          salary === "Tertinggi" ? { salary_max: { gt: 0 } } : {},
          salary === "Terendah" ? { salary_max: { gt: 1 } } : {},
        ],
      },
    });

    const totalPages = Math.ceil(totalItems / limit); // menghitung total halaman

    return NextResponse.json({
      status_code: 200,
      message: "Berhasil mendapatkan data seluruh lowongan kerja!",
      data,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    return NextResponse.json({
      status_code: 500,
      message: "Gagal mendapatkan data seluruh lowongan kerja!",
    });
  }
}
