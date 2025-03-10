import { atom } from "jotai";

export const ratingAtom = atom<number>(0);
export const companyTabAtom = atom<"deskripsi" | "pekerjaan">("deskripsi");

export const searchJob = atom<string>("");
export const valueFilterCity = atom<string>("");
export const valueFilterSalary = atom<string>("");
export const valueSearchCompany = atom<string>("");
export const jobVacancyId = atom<string>("");
export const jobApplicantId = atom<string>("");
