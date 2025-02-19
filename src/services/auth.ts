import { JobApplicantProps } from "@/types";
import { axiosClient } from "./axios";

export async function createAccount(
  data: Omit<JobApplicantProps, "id" | "cv">
) {
  try {
    const response = await axiosClient.post("/auth/sign-up", data);

    // cek status dari response
    if(response.data.status_code === 200) {
      window.location.reload();
    }
    return response.data;
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
    // cek status dari response
    if (response.data.status_code === 200) {
      window.location.reload();
    }
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}
