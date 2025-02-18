import { JobApplicantProps } from "@/types";
import { axiosClient } from "./axios";

export async function createAccount(data: Omit<JobApplicantProps, "cv">) {
  const response = await axiosClient.post("/auth/sign-up", data);
  return response.data;
}

export async function login(data: JobApplicantProps) {}
