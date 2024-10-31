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
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("No se pudo verificar la autenticación");
  }

  return await response.json();
};

export const refreshAuth = async () => {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("No se pudo refrescar la autenticación");
  }

  return await response.json();
};
