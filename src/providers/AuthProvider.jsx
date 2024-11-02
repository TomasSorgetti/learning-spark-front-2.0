"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useLoading } from "@/providers/LoadingProvider";
import { checkAuth } from "@/services/auth.service";
import { setUser } from "@/lib/slices/auth/authSlice";

const AuthProvider = ({ children }) => {
  const { startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const isAuthenticated = document.cookie.includes("isAuthenticated");
      if (isAuthenticated) {
        startLoading();
        try {
          const response = await checkAuth();

          if (response.status === 200) {
            dispatch(setUser(response.data.data));
          }
        } catch (error) {
          document.cookie =
            "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          router.push("/auth/login");
        } finally {
          stopLoading();
        }
      }
    };

    checkUserAuthentication();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
