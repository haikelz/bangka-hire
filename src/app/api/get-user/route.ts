import db from "@/lib/db";
import { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
  let searchUser = req?.nextUrl?.searchParams.get("search") as string

  const page: number = Number(
    req?.nextUrl?.searchParams.get("page") as string
  );
  const limit: number = Number(
    req?.nextUrl?.searchParams.get("limit") as string
  );


  const skip = (page - 1) * limit;

  const data = await db.user.findMany({
    take: limit,
    skip: skip ,
    where: {
      role: "job_applicant",
      full_name : {
        contains : searchUser,
        mode : "insensitive"
      }
    },
    orderBy: {
      createdAt: "desc",
    }
  });

const totalItems = await db.user.count({
  where: {
    role: "job_applicant",
    full_name : {
      contains : searchUser,
      mode : "insensitive"
    }
  }
})

  const totalPages = Math.ceil(totalItems / limit);

  return NextResponse.json({
    status_code: 200,
    message: "Sukses mendapatkan data seluruh pelamar kerja!",
    data,
    totalItems,
    totalPages,
    currentPage: page,
  });
}
