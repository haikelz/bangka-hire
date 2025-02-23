import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  await db.comment.create({
    data,
  });

  return NextResponse.json({
    status_code: 200,
    message: "Sukses membuat review",
  });
}
