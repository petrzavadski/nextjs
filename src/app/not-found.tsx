// src/app/not-found.tsx
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Страница не найдена</h2>
        <p className={styles.text}>
          Возможно, она была удалена или никогда не существовала
        </p>
        <Link href="/" className={styles.button}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
