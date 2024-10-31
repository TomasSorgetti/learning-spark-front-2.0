"use client";

import styles from "./page.module.css";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.auth);

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
          </>
        ) : (
          <p>No estas autenticado</p>
        )}
      </main>
    </div>
  );
}
