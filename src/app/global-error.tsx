"use client";
import styles from "./global-error.module.css";

export default function GlobalError() {
  return (
    <html>
      <body>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>Ошибка!!!!</h1>
            <h2 className={styles.subtitle}>Главное без паники.</h2>
            <p className={styles.text}>
              Произошла ошибка, но это не страшно. Жизнь на этом не
              заканчивается
            </p>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className={styles.button}
            >
              Вернуться на главную
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
