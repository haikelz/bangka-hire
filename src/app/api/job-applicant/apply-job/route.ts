import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

//
export async function POST(req: NextRequest) {
  // ambil user_id dan juga job_id dari body request
  const { user_id, job_id, cv } = await req.json();

  // cek dulu apakah user ada
  const existingUser = await db.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!existingUser) {
    return NextResponse.json({
      status_code: 404,
      message: "User tidak ditemukan!",
    });
  }

  // cek dulu apakah job ada
  const existingJob = await db.job.findUnique({
    where: {
      id: job_id,
    }
  })

  if (!existingJob) {
    return NextResponse.json({
      status_code: 404,
      message: "Job tidak ditemukan!",
    });
  }

  // cek dulu apakah user sudah pernah melamar job ini
  const existingJobApplicant = await db.usersOnJobs.findFirst({
    where: {
      user_id : user_id,
      jobs_id : job_id,
    }
  })

  // jika user sudah pernah melamar job ini, kembalikan pesan
  if (existingJobApplicant) {
    return NextResponse.json({
      status_code: 400,
      message: "Kamu sudah pernah melamar di pekerjaan ini!",
    });
  }

  // jika semua validasi sudah terlewati baru buat yang baru
  await db.usersOnJobs.create({
    data: {
      user_id: user_id,
      jobs_id: job_id,
      cv
    }
  })

  return NextResponse.json({
    status_code: 200,
    message: "Sukses melamar job!",
  });


}
