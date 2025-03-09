import type { CreateJobVacancyProviderProfileProps, EditJobVacancyProviderProfileProps, EditProfileUser, JobApplicantProps } from "@/types";
import { axiosClient } from "./axios";

export async function editProfileJobApplicant(data: EditProfileUser) {
  try {
    const response = await axiosClient.put("/admin/job-applicant/edit-profile", data);
    return response.data;
  } catch (error) {
    throw new Error("Gagal mengedit profile!");
  }
}

export async function editJobVacancyProviderProfileAdmin(data: EditJobVacancyProviderProfileProps) {
  try {
    const response = await axiosClient.put("/admin/job-vacancy-provider/edit-profile", data);
    return response.data;
  } catch (error) {
    throw new Error("Gagal mengedit profile!");
  }
}


export async function createUserAdmin (
  data: Omit<JobApplicantProps, "id" | "cv"> & { confirm_password: string }
) {
  try {
    const response = await axiosClient.post("/admin/create-user", data);
    return response.data;
  } catch (error) {
    throw new Error("Gagal membuat user!");
  }
}

export async function getUserJobVacancyAdmin(
  page: number,
  limit: number,
  searchUser: string
) {
  try {
    const response = await axiosClient.get(`/admin/job-vacancy-provider?search=${searchUser}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal mendapatkan data user!");
  }
}

export async function createJobVacancyProviderProfileAdmin(data: CreateJobVacancyProviderProfileProps) {
  try {
    const response = await axiosClient.post("/admin/job-vacancy-provider/create-profile", data);
    return response.data;
  } catch (error) {
    throw new Error("Gagal mendapatkan data user!");
  }
}
