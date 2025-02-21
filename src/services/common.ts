import { CommentProps, JobApplyProps } from "@/types";
import { axiosClient } from "./axios";

export async function createApplyJob(
  data: Omit<JobApplyProps, "user_id" | "job_id">
) {
  const response = await axiosClient.post("/job-applicant/apply-job", data);
  return response.data;
}

// mengambil semua data job di database
export async function getJobs(page = 1, limit = 8) {
  try {
    const response = await axiosClient.get(`/jobs?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    throw new Error("Gagal mengambil data lowongan kerja");
  }
}

export async function getJobVacancyProvider(id: string) {
  try {
    const response = await axiosClient.get(`/job-vacancy-provider/${id}`);
    return response;
  } catch (error) {
    throw new Error("Gagal mendapatkan data perusahaan!");
  }
}

export async function getJobVacancyProviders() {
  try {
    const response = await axiosClient.get(`/job-vacancy-provider`);
    return response;
  } catch (error) {
    throw new Error("Gagal mendapatkan data perusahaan!");
  }
}

export async function createReviewJobVacancyProvider(data: CommentProps) {
  try {
    // const response = await db.comment.create({ data: { ...data } });
  } catch (err) {
    throw new Error("Gagal membuat review perusahaan!");
  }
}
