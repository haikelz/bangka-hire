import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { position_job, company_id, salary_range, qualification, responsibilty, status_work } = await req.json()

  // pengecekan apakah user ini sudah melengkapi data perusahaan
  // const existingCompany = await db.profilCompany.findUnique({
  //   where: {
  //     id: company_id,
  //   },
  // });

  // if (!existingCompany) {
  //   return NextResponse.json({
  //     status_code: 404,
  //     message: "Anda belum melengkapi data perusahaan!",
  //   });
  // }

  // untuk merubah salary_range menjadi number
  function parseSalaryRange(range: string): { salary_min: number | null, salary_max: number | null } {
    // Jika "Negotiable"
    if (range === "Negotiable") return { salary_min: null, salary_max: null };

    // Jika "<1.000.000"
    if (range.startsWith("<")) {
        // Hapus karakter "<" dan semua titik, lalu parse ke integer
        const max = parseInt(range.substring(1).replace(/\./g, ""), 10);
        return { salary_min: null, salary_max: max };
    }

    // Jika ">10.000.000"
    if (range.startsWith(">")) {
        // Hapus karakter ">" dan semua titik, lalu parse ke integer
        const min = parseInt(range.substring(1).replace(/\./g, ""), 10);
        return { salary_min: min, salary_max: null };
    }

    // Split string berdasarkan tanda "-"
    const parts = range.split("-");
    if (parts.length === 2) {
        // Bersihkan spasi dan parse masing-masing bagian
        const min = parseInt(parts[0].trim().replace(/\./g, ""), 10);
        const max = parseInt(parts[1].trim().replace(/\./g, ""), 10);
        return {
            salary_min: isNaN(min) ? null : min,
            salary_max: isNaN(max) ? null : max
        };
    }

    return { salary_min: null, salary_max: null };
  }

  const { salary_min, salary_max } = parseSalaryRange(salary_range);

  // menambahkan job baru ke database
  await db.job.create({
    data: {
      position_job,
      company_id,
      salary_min,
      salary_max,
      qualification,
      responsibilty,
      status_work,
    },
  });

  return NextResponse.json({
    status_code: 200,
    message: "Sukses membuat lowongan kerja",
  });
}
