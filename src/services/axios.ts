import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
