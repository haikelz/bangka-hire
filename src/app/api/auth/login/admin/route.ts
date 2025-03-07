import { createSession } from "@/app/actions";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/constants";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email !== ADMIN_EMAIL && password !== ADMIN_PASSWORD) {
    return NextResponse.json({
      status_code: 400,
      message: "Email dan Password yang dimasukkan salah!",
    });
  } else if (email !== ADMIN_EMAIL) {
    return NextResponse.json({
      status_code: 400,
      message: "Email yang dimasukkan salah!",
    });
  } else if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({
      status_code: 400,
      message: "Password yang dimasukkan salah!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sessionData = {
    email,
    password: hashedPassword,
  };

  await createSession(sessionData);

  return NextResponse.json({
    status_code: 200,
    message: "Berhasil login",
  });
}
