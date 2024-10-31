"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/slices/auth/authSlice";
import { logoutService } from "@/services/auth.service";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      const response = await logoutService();
      console.log("Logout:", response);
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
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hola mundo</h1>
        {user.isAuthenticated ? (
          <>
            <p>Estas autenticado</p>
            <ul>
              <li>id: {user.id}</li>
              <li>name: {user.name}</li>
              <li>lastname: {user.lastname}</li>
              <li>email: {user.email}</li>
              <ul>
                {user.roles?.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </ul>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>No estas autenticado</p>
        )}
      </main>
    </div>
  );
}
