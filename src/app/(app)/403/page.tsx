// src/app/not-found.tsx
import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>403</h1>
        <h2 className={styles.subtitle}>Ошибка Авторизации</h2>
        <p className={styles.text}>Вы не админ</p>
        <Link href="/" className={styles.button}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
