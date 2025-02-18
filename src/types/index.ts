import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type JobApplicantProps = {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  password: string;
  cv: string; // s3 url
};

export type JobVacancyProvider = {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  password: string;
};
