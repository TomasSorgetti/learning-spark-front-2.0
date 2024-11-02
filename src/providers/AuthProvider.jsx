"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useLoading } from "@/providers/LoadingProvider";
import { checkAuth } from "@/services/auth.service";
import { setUser } from "@/lib/slices/auth/authSlice";

const AuthProvider = ({ children }) => {
  const { startLoading, stopLoading } = useLoading();
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      if (isAuthenticated) {
        startLoading();
        try {
          const response = await checkAuth();
          if (response.status === 200) dispatch(setUser(response.data.data));
        } catch (error) {
          console.error("ERROR:", error);
          setIsAuthenticated(false);
          document.cookie =
            "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          // TODO => if unknown error, notify user with toast
          router.push("/login");
        } finally {
          stopLoading();
        }
      }
    };

    checkUserAuthentication();
  }, [isAuthenticated, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
