import { JobApplicantProps } from "@/types";
import { axiosClient } from "./axios";

export async function createAccount(
  data: Omit<JobApplicantProps, "id" | "cv" > & { confirm_password: string }
) {
  try {
    const response = await axiosClient.post("/auth/sign-up", data);

    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}


// create account untuk perusahaan
export async function createAccountForJobVacancy(
  data: Omit<JobApplicantProps, "id" | "cv"> & { confirm_password: string }
) {
  try {
    const response = await axiosClient.post("/auth/sign-up-job-vacancy-provider", data);

    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

// mendapatkan user sudah login saat ini
export async function getCurrentUser() {
  try {
    const response = await axiosClient.get("/auth/user-current");
    if (response.data.status_code === 200) {
      // return data user tanpa password
      delete response.data.user.password;
      return response.data;
    }
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

// logic logout
export async function logoutAccount() {
  try {
    const response = await axiosClient.post("/auth/logout");
    window.location.reload(); // reload page
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function loginAccount(
  data: Pick<JobApplicantProps, "email" | "password">
) {
  try {
    const response = await axiosClient.post("/auth/login", data);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}
