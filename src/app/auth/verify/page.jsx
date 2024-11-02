"use client";

import { verifyEmailService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Verify() {
  const [code, setCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setCode(e.target.value);
  };
  console.log(code);

  useEffect(() => {
    if (code.length === 6) {
      setIsLoading(true);
      try {
        const fetchData = async () => {
          const response = await verifyEmailService(code);
          setIsLoading(false);
          const res = await response.json();
          console.log(res);
          if (res.success) {
            router.push("/login");
          } else {
            throw new Error(res.codeError);
          }
        };
        fetchData();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [code, router]);
  return (
    <main>
      {isLoading && <p>Loading...</p>}
      <h1>Verify Account</h1>
      <input type="number" onChange={handleChange} />
    </main>
  );
}
