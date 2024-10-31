"use client";

import styles from "./LoadingBar.module.css";
import { useAppSelector } from "@/lib/hooks";

export default function LoadingBar() {
  const loading = useAppSelector((state) => state.loading);

  return (
    <div
      className={`${styles.loadingBar} ${
        loading.isLoading ? styles.loading : ""
      }`}
    ></div>
  );
}
