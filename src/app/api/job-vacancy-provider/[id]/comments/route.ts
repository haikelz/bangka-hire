import db from "@/lib/db";
import { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: APIRouteParamsProps) {
  const { id } = await props.params;
  console.log(req);

  try {
    const response = await db.comment.findMany({
      where: { company_id: id },
    });

    return NextResponse.json({
      status_code: 200,
      message: "Sukses ulasan tentang perusahaan!",
      data: response,
    });
  } catch (error) {
    return NextResponse.json({
      status_code: 500,
      message: "Gagal mendapatkan data perusahaan!",
    });
  }
}
