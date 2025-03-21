import db from "@/lib/db";
import type { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, props: APIRouteParamsProps) {
  const { id } = await props.params;

  await db.job.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    status_code: 200,
    message: "Sukses menghapus job!",
  });
}
