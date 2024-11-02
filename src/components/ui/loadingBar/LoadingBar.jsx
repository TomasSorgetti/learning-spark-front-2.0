"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingBar.module.css";
import { useLoading } from "@/providers/LoadingProvider";

export default function LoadingBar() {
  const { loading } = useLoading();
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState(null);
  const MIN_LOADING_TIME = 300;

  useEffect(() => {
    if (loading) {
      setShowLoadingBar(true);
      setLoadingStartTime(Date.now());
    } else {
      const elapsedTime = Date.now() - loadingStartTime;
      const remainingTime = MIN_LOADING_TIME - elapsedTime;

      const timer = setTimeout(() => {
        setShowLoadingBar(false);
      }, Math.max(remainingTime, 0));

      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div
      className={`${styles.loadingBar} ${showLoadingBar ? styles.loading : ""}`}
    ></div>
  );
}
