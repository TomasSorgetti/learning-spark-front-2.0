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
    e.preventDefault();
    setIsLoading(true);
    try {
      const fetchData = async () => {
        const response = await loginService(formData);
        const res = await response.json();
        if (!res.success) {
          throw new Error(res.message);
        } else {
          setFetchError("");
          dispatch(setUser(res.data.user));
          router.push("/");
          setIsAuthenticated(true);
        }
      };
      await fetchData();
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <p>Loading...</p> : null}
      {fetchError ? <p>{fetchError}</p> : null}
      <form onSubmit={handleSubmit}>
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
