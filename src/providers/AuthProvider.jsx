"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoading } from "@/providers/LoadingProvider";
import { checkAuth, logoutService } from "@/services/auth.service";
import { setUser } from "@/lib/slices/auth/authSlice";

const AuthProvider = ({ children }) => {
  const { startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();

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
          if (error.response.data.errorCode === "TOKEN_REQUIRED") {
            try {
              await logoutService();
              dispatch(logout());
            } catch (error) {
              console.log(error);
            }
          }
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
