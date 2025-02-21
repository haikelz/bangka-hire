import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function GET(req: NextRequest, { params }: Props) {
  const { id } = await params;

  try {
    const response = await db.user.findUnique({
      where: { role: "job_vacancy_provider", id },
      omit: {
        password: false,
      },
    });

    return NextResponse.json({
      status_code: 200,
      message: "Sukses mendapatkan data perusahaan!",
      data: response,
    });
  } catch (error) {
    throw new Error("Gagal mendapatkan data perusahaan!");
  }
}
