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
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
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
      if (response.data.success) {
        dispatch(logout());
        router.push("/auth/login");
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
          <>
            <Link onClick={handleActive} href="/profile">
              Profle
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link onClick={handleActive} href="/auth/login" replace>
              Login
            </Link>
            <Link onClick={handleActive} href="/auth/register" replace>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
