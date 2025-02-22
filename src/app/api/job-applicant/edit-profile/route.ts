import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/services/auth";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { createSession } from "@/app/actions";


export async function PUT(req: NextRequest) {
    let { full_name, phone_number, user_id, description } = await req.json();

    const existingJobApplicant = await db.user.findUnique({
      where : {
        id: user_id
      }
    })

    // pengecekan bila user tidak ada di database
    if (!existingJobApplicant) {
      return NextResponse.json({
        status_code: 400,
        message: "User tidak ditemukan!",
      });
    }

    // jika description kosong pakai description lama
    if (!description) {
      description = existingJobApplicant.description
    }

    // jika full_name kosong pakai full_name lama
    if (!full_name) {
      full_name = existingJobApplicant.full_name
    }

    // jika phone_number kosong pakai phone_number lama
    if (!phone_number) {
      phone_number = existingJobApplicant.phone_number
    }

    console.log(description)

    // update data user
    const updatedJobApplicant = await db.user.update({
      where: {
       id: user_id
      },
      data: {
        full_name,
        phone_number,
        description
      },
    });

    // update session user
    await createSession(updatedJobApplicant);

    return NextResponse.json({
      status_code: 200,
      message: "Berhasil merubah data profile!",
    });

}
