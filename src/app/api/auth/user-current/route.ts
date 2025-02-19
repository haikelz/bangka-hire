import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Ambil cookie "auth-token"
  const authCookies = await cookies();
  const authToken = authCookies.get("auth-token")?.value;

  if (!authToken) {
    return NextResponse.json(
      { status_code: 401, message: "User belum login!" },
      { status: 401 }
    );
  }

  try {
    // Decode Base64
    const decoded = JSON.parse(atob(authToken));

    console.log(decoded);

    // Cek apakah session sudah expired
    if (new Date(decoded.expires) < new Date()) {
      return NextResponse.json(
        { status_code: 401, message: "Session expired!" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      status_code: 200,
      user: decoded.user,
    });
  } catch (error) {
    return NextResponse.json(
      { status_code: 500, message: "Gagal membaca session!" },
      { status: 500 }
    );
  }
}
