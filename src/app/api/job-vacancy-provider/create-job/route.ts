import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // User data
    const {} = await req.json();
    return NextResponse.json({
      status_code: 200,
      message: "Sukses membuat pekerjaan!",
    });
  } catch (error) {
    return NextResponse.json({
      status_code: 500,
      message: "Internal Server Error",
    });
  }
}
