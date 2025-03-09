import { checkAvailableAuthToken } from "@/app/actions";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const isAvailableAuthToken = checkAvailableAuthToken(req);

    if (!isAvailableAuthToken.isAvailable || isAvailableAuthToken.isExpired) {
      return NextResponse.json({
        status_code: 401,
        message: "Unauthorized!",
      });
    }

    const data = await req.json();

    await db.comment.create({
      data,
    });

    return NextResponse.json({
      status_code: 200,
      message: "Sukses membuat review perusahaan!",
    });
  } catch (err) {
    return NextResponse.json({
      status_code: 500,
      message: "Gagal membuat review perusahaan!",
    });
  }
}
