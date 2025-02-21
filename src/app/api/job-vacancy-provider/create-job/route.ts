import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // User data
    const {} = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
