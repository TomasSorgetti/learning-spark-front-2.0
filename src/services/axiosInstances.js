import axios from "axios";
import authInterceptor from "@/interceptors/authInterceptor";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

authInterceptor(axiosInstance);
