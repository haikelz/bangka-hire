import { checkAvailableAuthToken } from "@/app/actions";
import db from "@/lib/db";
import type { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: APIRouteParamsProps) {
  const { id: job_id } = await props.params;

  const user_cv = req.nextUrl.searchParams.get("user_cv");

  if (user_cv) {
    const isAvailableAuthToken = checkAvailableAuthToken(req);

    if (!isAvailableAuthToken) {
      return NextResponse.json({
        status_code: 401,
        message: "Unauthorized!",
      });
    }

    const existingJob = await db.job.findFirst({
      where: {
        id: job_id,
      },
      include: {
        company: {
          select: {
            user: {
              select: {
                image: true, // Gambar perusahaan
                full_name: true, // Nama perusahaan
              },
            },
            city: true, // Kota perusahaan
            description_company: true, // Deskripsi perusahaan
          },
        },
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    // jika job tidak ditemukan
    if (!existingJob) {
      return NextResponse.json({
        status_code: 404,
        message: "Lowongan tidak ditemukan!",
      });
    }

    const companyComments = await db.comment.findMany({
      where: {
        company_id: existingJob?.company_id, // Ambil komentar berdasarkan ID perusahaan
      },
      select: {
        rating: true,
      },
    });

    return NextResponse.json({
      status_code: 200,
      message: "Sukses mendapatkan lowongan kerja!",
      data: {
        ...existingJob,
        company: {
          ...existingJob?.company,
          comments: companyComments,
        },
      },
    });
  }

  const existingJob = await db.job.findFirst({
    where: {
      id: job_id,
    },
    include: {
      company: {
        select: {
          user: {
            select: {
              image: true, // Gambar perusahaan
              full_name: true, // Nama perusahaan
            },
          },
          city: true, // Kota perusahaan
          description_company: true, // Deskripsi perusahaan
        },
      },
    },
  });

  // jika job tidak ditemukan
  if (!existingJob) {
    return NextResponse.json({
      status_code: 404,
      message: "Lowongan tidak ditemukan!",
    });
  }

  const companyComments = await db.comment.findMany({
    where: {
      company_id: existingJob?.company_id, // Ambil komentar berdasarkan ID perusahaan
    },
    select: {
      rating: true,
    },
  });

  return NextResponse.json({
    status_code: 200,
    message: "Sukses mendapatkan lowongan kerja!",
    data: {
      ...existingJob,
      company: {
        ...existingJob?.company,
        comments: companyComments, // Gabungkan komentar ke dalam response
      },
    },
  });
}
