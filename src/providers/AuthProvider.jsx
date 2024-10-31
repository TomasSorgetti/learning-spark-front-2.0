"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  verifyUserAuthentication,
  refreshUserAuthentication,
} from "../lib/slices/auth/authSlice";
import {
  setLoadingState,
  setErrorState,
} from "../lib/slices/loading/loadingSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      dispatch(setLoadingState(true));
      try {
        await dispatch(verifyUserAuthentication());
      } catch (error) {
        console.error("Authentication error: Trying to refresh ", error);
        try {
          await dispatch(refreshUserAuthentication());
        } catch (refreshError) {
          dispatch(setErrorState(refreshError.message));
        }
      } finally {
        dispatch(setLoadingState(false));
      }
    };

    checkUserAuthentication();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
