"use client";

import AuthProvider from "./AuthProvider";
import StoreProvider from "./StoreProvider";

export default function AppProvider({ children }) {
  return (
    <StoreProvider>
      <AuthProvider>{children}</AuthProvider>
    </StoreProvider>
  );
}
