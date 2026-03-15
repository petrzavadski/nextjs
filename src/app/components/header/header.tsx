import Link from "next/link";

import styles from "./header.module.css";
import { LoginSection } from "../loginSection/loginSection";
import { AuthSection } from "../authSection/authSection";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={"/"}>Главная</Link>
      <Link href={"/rackets"}>Ракетки</Link>
      <Link href={"/top10"}>Топ 10</Link>
      <AuthSection />
      <Link href={"/login"} className={styles.loginLink}>
        <LoginSection />
      </Link>
    </header>
  );
};
