import type { EditJobVacancyProviderProfileProps, EditProfileUser } from "@/types";
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
