"use client";

import styles from "./AuthButtons.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useLocalStorage from "@/hooks/useLocalStorage";
import { logoutService } from "@/services/auth.service";
import { logout } from "@/lib/slices/auth/authSlice";
import authIcon from "@/assets/images/userIcon.png";
import Image from "next/image";
import { useState, useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";

export default function AuthButtons() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const [, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);
  const [active, setActive] = useState(false);
  const authMenuRef = useRef(null);

  useClickOutside(authMenuRef, () => setActive(false));

  const handleActive = () => {
    setActive(!active);
  };

  const handleLogout = async () => {
    handleActive();
    try {
      const response = await logoutService();
      if (response.ok) {
        dispatch(logout());
        setIsAuthenticated(false);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container} ref={authMenuRef}>
      <button className={styles.button} onClick={handleActive}>
        <Image src={authIcon} alt="user icon" />
      </button>
      <div className={`${styles.menu} ${active ? styles.active : ""}`}>
        {user?.isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link onClick={handleActive} href="/login">
              Login
            </Link>
            <Link onClick={handleActive} href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
