"use client";

import AuthProvider from "./AuthProvider";
import StoreProvider from "./StoreProvider";
import { LoadingProvider } from "./LoadingProvider";

export default function AppProvider({ children }) {
  return (
    <StoreProvider>
      <LoadingProvider>
        <AuthProvider>{children}</AuthProvider>
      </LoadingProvider>
    </StoreProvider>
  );
}
