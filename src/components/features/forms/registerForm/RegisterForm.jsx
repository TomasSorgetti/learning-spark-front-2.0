"use client";

import { FormField } from "@/components/ui";
import { registerService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirm: "",
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
        const response = await registerService(formData);
        if (response.status === 200 || response.status === 201) {
          setFetchError("");
          router.push("/verify");
        }
      };
      await fetchData();
    } catch (error) {
      setFetchError(error.response.data.errorCode);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fetchError && <p>{fetchError}</p>}
      <FormField
        type="text"
        label="Name:"
        handleChange={handleChange}
        value={formData.name}
        name="name"
      />
      <FormField
        type="text"
        label="LastName:"
        handleChange={handleChange}
        value={formData.lastname}
        name="lastname"
      />
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
      <FormField
        type="password"
        label="Confirm Password:"
        handleChange={handleChange}
        value={formData.confirm}
        name="confirm"
      />
      <button type="submit">Register</button>
    </form>
  );
}
