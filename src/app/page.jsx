"use client";

import styles from "./page.module.css";

export default function Home() {
  const logout = async () => {
    try {
      await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Home Page</h1>
        <button onClick={logout}>Logout</button>
      </main>
    </div>
  );
}
