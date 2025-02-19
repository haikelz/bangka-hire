import db from "@/lib/db";
import { JobApplyProps } from "@/types";
import { axiosClient } from "./axios";

export async function createApplyJob(data : Omit<JobApplyProps, "user_id" | "job_id">) {
  const response = await axiosClient.post("/job-applicant/apply-job", data);
  return response.data;
}

// mengambil semua data job di database
export async function getJobApplicant(page = 1) {
  try {
    const limit = 8; // jumlah item perhalaman kel ambik 8 bai ok
    const skip = (page - 1) * limit; // menghitung skip

    // ambil data semua lowongan kerja di database
    const data = await db.job.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        company: {
          select: {
            user: {
              select: {
                full_name: true // mengambil nama perusahaan
              }
            },
            city: true // mengambil kota perusahaan seperti pangkal pinang, sungailiat
          }
        }
      }
    });

    const totalItems = await db.job.count(); // menghitung total item
    const totalPages = Math.ceil(totalItems / limit); // menghitung total halaman

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page
    };
  } catch (error) {
    throw new Error('Gagal mengambil data lowongan kerja');
  }
}

