import { authInstance, axiosInstance } from "./axiosInstances";

export const loginService = (data) => authInstance.post("/auth/signin", data);
export const registerService = (data) =>
  authInstance.post("/auth/signup", data);
export const logoutService = () => authInstance.post("/auth/logout");

export const checkAuth = () => axiosInstance.get("/auth/me");
export const verifyEmailService = (code) =>
  axiosInstance.get(`/auth/verify/${code}`);
