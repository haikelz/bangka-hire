import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

//
export async function POST(req: NextRequest) {
  try {
    // ambil data user yang sedang login saat ini
    const session = await getServerSession();

    // pengecekan bila belum login
    if (!session || !session.user) {
      return NextResponse.json({
        status_code: 401,
        message: "Kamu belum login!",
      });
    }

    // ambil user_id dan juga job_id dari json
    const { job_id } = await req.json();

    // buat relasi antara user dan job
    const existingJobApplicant = await db.usersOnJobs.findFirst({
      where: {
        user_id: session.user.id,
        jobs_id: job_id,
      },
    });

    // pengecekan bila relasi sudah ada
    if (existingJobApplicant) {
      return NextResponse.json({
        status_code: 400,
        message: "Lowongan kerja sudah kamu daftar!",
      });
    }

    // buat relasi antara user dan job
    await db.usersOnJobs.create({
      data: {
        user_id: session.user.id,
        jobs_id: job_id,
      },
    });

    return NextResponse.json({
      status_code: 200,
      message: "Sukses mendaftar lowongan kerja!",
    });
  } catch (error) {
    return NextResponse.json({
      status_code: 400,
      message: "Gagal mendaftar lowongan kerja!",
    });
  }
}
