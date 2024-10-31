const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const loginService = async (data) => {
  return await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};
export const registerService = async (data) => {
  return await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const checkAuth = async () => {
  return await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });
};

export const refreshAuth = async () => {
  return await fetch(`${BASE_URL}/auth/refresh`, {
    method: "GET",
    credentials: "include",
  });
};

export const logoutService = async () => {
  return await fetch(`${BASE_URL}/auth/logout`, {
    method: "GET",
    credentials: "include",
  });
};

export const verifyEmailService = async (code) => {
  return await fetch(`${BASE_URL}/auth/verify/${code}`, {
    method: "GET",
    credentials: "include",
  });
};
