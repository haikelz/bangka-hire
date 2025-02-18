import { JobApplicantProps } from "@/types";
import { axiosClient } from "./axios";

export async function createAccount(
  data: Omit<JobApplicantProps, "id" | "cv">
) {
  const response = await axiosClient.post("/auth/sign-up", data);
  return response.data;
}

export async function loginAccount(
  data: Pick<JobApplicantProps, "email" | "password">
) {
  const response = await axiosClient.post("/auth/login", data);
  return response.data;
}
