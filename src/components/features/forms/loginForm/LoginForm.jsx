"use client";

import { FormField } from "@/components/ui";
import { loginService } from "@/services/auth.service";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/slices/auth/authSlice";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function LoginForm() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      setIsLoading(true);
      try {
        const fetchData = async () => {
          const response = await loginService(formData);
          if (response.status == 200) {
            setFetchError("");
            // dispatch(setUser(response.data.data));
            // document.cookie = "isAuthenticated=true; path=/";
            // router.push("/");
            setIsAuthenticated(true);
          }
        };
        await fetchData();
      } catch (error) {
        // TODO => if unknown error, notify user with toast (error !== USER_NOT_FOUND && error !== WRONG_PASSWORD)
        setIsAuthenticated(false);
        setFetchError(error.response.data.errorCode);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    window.location.href = `${SERVER_URL}/auth/google`;
  };

  return (
    <>
      {isLoading ? <p>Loading...</p> : null}
      {fetchError ? <p>{fetchError}</p> : null}
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={handleGoogleLogin}>
          Iniciar Sesión con Google
        </button>
        <FormField
          type="email"
          label="Email:"
          handleChange={handleChange}
          value={formData.email}
          name="email"
        />
        <FormField
          type="password"
          label="Password:"
          handleChange={handleChange}
          value={formData.password}
          name="password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
