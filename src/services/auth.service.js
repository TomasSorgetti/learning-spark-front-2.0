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
