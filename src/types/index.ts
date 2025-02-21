import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type JobApplyProps = {
  user_id: string;
  job_id: string;
};

export type JobApplicantProps = {
  id: string;
  image?: string;
  role?: string;
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

export type UserProps = JobApplicantProps & JobVacancyProvider;

export type UsersOnJobsProps = {
  id: number;
  user: UserProps;
  user_id: string;
  job: JobProps;
  jobs_id: string;
};

export type JobProps = {
  id: string;
  company_id: string;
  position_job: string;
  responsibilty: string;
  qualification: string;
  salary: string;
  status_work: string;
  createdAt: Date;
  updatedAt: Date;
  company: ProfilCompanyProps;
  users: UsersOnJobsProps[];
};

export type ProfilCompanyProps = {
  id: string;
  user_id: string;
  description_company: string;
  street: string;
  city: string;
  total_employers: string;
  gmail: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserProps;
  comments: Comment[];
  jobs: JobProps[];
};

export type CommentProps = {
  id: string;
  user_id: string;
  company_id: string;
  body: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  user: UserProps;
  company: ProfilCompanyProps;
};
