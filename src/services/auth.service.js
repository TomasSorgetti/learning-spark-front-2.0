import { authInstance, axiosInstance } from "./axiosInstances";

export const loginService = (data) => authInstance.post("/auth/signin", data);
export const registerService = (data) =>
  authInstance.post("/auth/signup", data);

export const checkAuth = () => axiosInstance.get("/auth/me");
// export const refreshAuth = () => axiosInstance.get("/auth/refresh");
export const logoutService = () => axiosInstance.get("/auth/logout");
export const verifyEmailService = (code) =>
  axiosInstance.get(`/auth/verify/${code}`);
