import { atom } from "jotai";

export const ratingAtom = atom<number>(0);
export const companyTabAtom = atom<"deskripsi" | "pekerjaan">("deskripsi");
