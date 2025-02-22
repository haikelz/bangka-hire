import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { user_id, company_id, body, rating } = await req.json();
  console.log(rating);
  await db.comment.create({
    data: {
      user_id,
      company_id,
      body,
      rating,
    },
  });

  return NextResponse.json({
    status_code: 200,
    message: "Sukses membuat review",
  });
}
