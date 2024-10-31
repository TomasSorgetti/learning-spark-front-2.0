"use client";

import { FormField } from "@/components/ui";
import { useState } from "react";

export default function RegisterForm() {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
}
