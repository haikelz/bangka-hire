import { checkAvailableAdminAuthToken } from "@/app/actions";
import db from "@/lib/db";
import type { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, props: APIRouteParamsProps) {
  const { id } = await props.params;

  const isAvailableAdminAuthToken = checkAvailableAdminAuthToken(req);

  if (
    !isAvailableAdminAuthToken.isAvailable ||
    isAvailableAdminAuthToken.isExpired
  ) {
    return NextResponse.json({
      status_code: 401,
      message: "Unauthorized!",
    });
  }

  await db.user.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    status_code: 200,
    message: "User berhasil dihapus!",
  });
}
