import Link from "next/link";
import styles from "./Navbar.module.css";
import { AuthButtons } from "@/components/ui";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">logo</Link>
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <AuthButtons />
          </li>
        </ul>
      </nav>
    </header>
  );
}
