import { JobApplicantProps } from "@/types";
import { axiosClient } from "./axios";

export async function createAccount(
  data: Omit<JobApplicantProps, "id" | "cv">
) {
  try {
    const response = await axiosClient.post("/auth/sign-up", data);
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
