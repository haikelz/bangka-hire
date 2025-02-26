import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type EditProfileUser = {
  description?: string;
  user_id?: string;
  full_name?: string;
  cv?: string;
  phone_number?: string;
  google_oauth?: boolean;
};

export type JobApplyProps = {
  user_id?: string;
  job_id?: string;
  cv?: string;
};

export type JobApplicantProps = {
  id: string;
  image?: string;
  role?: string;
  email: string;
  full_name: string;
  phone_number: string;
  description?: string;
  password: string;
  cv: string; // s3 url
};

export type JobVacancyProviderProps = {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  password: string;
};

export type UserProps = {
  id: string;
  image?: string;
  role?: "job_vacancy_provider" | "job_applicant" | "admin";
  email: string;
  full_name: string;
  phone_number: string;
  description?: string;
  password: string;
  cv?: string; // s3 url
  google_oauth: boolean;
  createdAt: Date;
  updatedAt: Date;
  profile: ProfilCompanyProps;
  comments: CommentProps[];
  jobs: JobProps[];
};

export type UsersOnJobsProps = {
  id: number;
  user: UserProps;
  user_id: string;
  job: JobProps;
  cv?: string;
  jobs_id: string;
};

export type JobProps = {
  id: string;
  company_id: string;
  position_job: string;
  responsibilty: string;
  qualification: string;
  salary_min: number;
  salary_max: number;
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
  user?: UserProps;
  comments?: CommentProps[];
  jobs?: JobProps[];
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

export type APIRouteParamsProps = {
  params: Promise<{ id: string; job_id: string; user_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
