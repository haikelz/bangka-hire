import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { password, full_name, email, phone_number } = req.body;

    const existingJobApplicant = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingJobApplicant) {
      return res.json({
        status_code: 400,
        message: "Email yang kamu masukkan sudah terdaftar!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        full_name,
        phone_number,
        email,
        role: "job_applicant",
        password: hashedPassword,
      },
    });

    return res.json({
      status_code: 200,
      message: "Berhasil membuat akun!",
    });
  } catch (err) {
    return res.json({
      status_code: 500,
      message: "Sepertinya ada kesalahan disisi server!",
    });
  }
}
