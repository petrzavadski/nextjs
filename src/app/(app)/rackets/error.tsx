"use client";
import Link from "next/link";
import styles from "./error.module.css";

export default function Error() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Ошибка!!!!</h1>
        <h2 className={styles.subtitle}>Главное без паники.</h2>
        <p className={styles.text}>
          Произошла ошибка, но это не страшно. Жизнь на этом не заканчивается
        </p>
        <Link href="/" className={styles.button}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
