"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  verifyUserAuthentication,
  refreshUserAuthentication,
} from "../lib/slices/auth/authSlice";
import { setLoadingState } from "../lib/slices/loading/loadingSlice";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      if (isAuthenticated) {
        dispatch(setLoadingState(true));
        try {
          await dispatch(verifyUserAuthentication());
        } catch (error) {
          console.error(error.message);
          try {
            await dispatch(refreshUserAuthentication());
          } catch (refreshError) {
            console.log(refreshError.message);
            router.push("/login");
            setIsAuthenticated(false);
          }
        } finally {
          dispatch(setLoadingState(false));
        }
      }
    };

    checkUserAuthentication();
  }, [dispatch, router, isAuthenticated, setIsAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider;
