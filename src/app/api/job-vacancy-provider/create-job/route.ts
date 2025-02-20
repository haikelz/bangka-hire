import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // ambil data yang di input oleh user
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
