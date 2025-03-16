import type {
  CommentProps,
  CreateJobProps,
  CreateJobVacancyProviderProfileProps,
  EditJobProps,
  EditJobVacancyProviderProfileProps,
  EditProfileUser,
  JobApplyProps,
} from "@/types";
import { axiosClient } from "./axios";

// mendapatkan user saat ini dari database
export async function getUserPrisma(id?: string) {
  try {
    const response = await axiosClient.get(`/get-user/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal mendapatkan data user!");
  }
}

// cek user on jobs di database
export async function getUserOnJobs(user_id: string, job_id: string) {
  try {
    const response = await axiosClient.get(
      `/job-applicant/user-on-jobs/${user_id}/${job_id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Gagal mendapatkan data user!");
  }
}

// edit profile untuk user
export async function editProfile(data: EditProfileUser) {
  try {
    const response = await axiosClient.put("/job-applicant/edit-profile", data);

    return response.data;
  } catch (error) {
    throw new Error("Gagal mengedit profile!");
  }
}

export async function createApplyJob(data: JobApplyProps) {
  const response = await axiosClient.post("/job-applicant/apply-job", data);
  return response.data;
}

type GetJobsParamProps = {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  salary?: string;
  id?: string;
};

// mengambil semua data job di database
export async function getJobs({
  page = 1,
  limit = 8,
  search = "",
  city = "",
  salary = "",
  id = "",
}: GetJobsParamProps) {
  try {
    const response = await axiosClient.get(
      `/jobs?search=${search}&city=${city}&salary=${salary}&page=${page}&limit=${limit}&id=${id}`
    );
    return response;
  } catch (error) {
    throw new Error("Gagal mengambil data lowongan kerja");
  }
}

// mengambil detail job
export async function getJobById(id: string, user_cv?: boolean) {
  try {
    const response = await axiosClient.get(`/jobs/${id}?user_cv=${user_cv}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal mendapatkan data lowongan kerja!");
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

export async function getJobVacancyProviders(
  page: number,
  limit: number,
  searchCompany: string
) {
  try {
    const response = await axiosClient.get(
      `/job-vacancy-provider?search=${searchCompany}&page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    throw new Error("Gagal mendapatkan data perusahaan!");
  }
}

export async function createReviewJobVacancyProvider(
  data: Pick<CommentProps, "user_id" | "company_id" | "rating" | "body">
) {
  try {
    const response = await axiosClient.post(
      "/job-applicant/create-review-job-vacancy-provider",
      data
    );
    return response;
  } catch (err) {
    throw new Error("Gagal membuat review perusahaan!");
  }
}

export async function getCommentsByCompanyId(id: string) {
  try {
    const response = await axiosClient.get(
      `/job-vacancy-provider/${id}/comments`
    );
    return response;
  } catch (err) {
    throw new Error("Gagal mendapatkan ulasan tentang perusahaan!");
  }
}

// create job
export async function createJob(data: CreateJobProps) {
  try {
    const response = await axiosClient.post(
      "/job-vacancy-provider/create-job",
      data
    );
    return response.data;
  } catch (err) {
    throw new Error("Gagal membuat lowongan kerja!");
  }
}

export async function getCompanyByUserId(id: string) {
  try {
    const response = await axiosClient.get(
      `/job-vacancy-provider/already-create-profile/${id}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Gagal mendapatkan data perusahaan!");
  }
}

export async function editJobVacancyProviderProfile(
  data: EditJobVacancyProviderProfileProps
) {
  try {
    const response = await axiosClient.put(
      `/job-vacancy-provider/edit-profile`,
      data
    );
    return response.data;
  } catch (err) {
    throw new Error("Gagal mengedit profile!");
  }
}

export async function createJobVacancyProviderProfile(
  data: CreateJobVacancyProviderProfileProps
) {
  try {
    const response = await axiosClient.post(
      `/job-vacancy-provider/create-profile`,
      data
    );
    return response.data;
  } catch (err) {
    throw new Error("Gagal membuat profile perusahaan!");
  }
}

export async function editJobs(data: EditJobProps) {
  try {
    const response = await axiosClient.put(`/jobs/edit-jobs`, data);
    return response.data;
  } catch (err) {
    throw new Error("Gagal mengedit lowongan kerja!");
  }
}

export async function deleteJob(id: string) {
  try {
    const response = await axiosClient.delete(`/jobs/delete-jobs/${id}`);
    return response.data;
  } catch (err) {
    throw new Error("Gagal menghapus lowongan kerja!");
  }
}

export async function getAllUser(
  page: number,
  limit: number,
  searchUser: string
) {
  try {
    const response = await axiosClient.get(
      `/get-user?search=${searchUser}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Gagal mendapatkan data seluruh user!");
  }
}
export async function deleteUser(id?: string) {
  try {
    const response = await axiosClient.delete(
      `/job-applicant/delete-user/${id}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Gagal menghapus user!");
  }
}
