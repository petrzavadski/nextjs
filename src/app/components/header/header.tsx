import Link from "next/link";

import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={"/"}>Главная</Link>
      <Link href={"/rackets"}>Ракетки</Link>
      <Link href={"/top10"}>Топ 10</Link>
    </header>
  );
};
