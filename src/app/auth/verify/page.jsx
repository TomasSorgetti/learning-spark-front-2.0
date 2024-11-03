"use client";

import { verifyEmailService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Verify() {
  const [code, setCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [exipresIn, setExipresIn] = useState(() => {
    const savedTime = localStorage.getItem("emailTokenExpiresIn");
    return savedTime ? JSON.parse(savedTime) : { minutes: 15, seconds: 0 };
  });

  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("emailTokenExpiresIn", JSON.stringify(exipresIn));

    const timer = setInterval(() => {
      if (exipresIn.seconds > 0) {
        setExipresIn((prev) => {
          return {
            ...prev,
            seconds: prev.seconds - 1,
          };
        });
      }
      if (exipresIn.seconds === 0) {
        if (exipresIn.minutes === 0) {
          clearInterval(timer);
        } else {
          setExipresIn((prev) => {
            return {
              ...prev,
              minutes: prev.minutes - 1,
              seconds: 59,
            };
          });
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      localStorage.removeItem("emailTokenExpiresIn");
    };
  }, [exipresIn]);

  const formatTime = (num) => String(num).padStart(2, "0");
  const codeExpiresIn = `${formatTime(exipresIn.minutes)}:${formatTime(
    exipresIn.seconds
  )}`;

  const handleChange = (e) => {
    setCode(e.target.value);
  };

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
      <h1>Verify your email address</h1>
      <p>
        Please check your inbox and enter the verification code below to verify
        your email address. The code will expire in {codeExpiresIn}
      </p>
      <input type="number" onChange={handleChange} />
    </main>
  );
}
