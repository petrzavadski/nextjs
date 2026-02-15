import Link from "next/link";
import styles from "./styles.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <header className={styles.header}>
        <Link href={"/"}>Главная</Link>
        <Link href={"/rackets"}>Ракетки</Link>
      </header>
      <body className={styles.content}>{children}</body>
      <footer className={styles.footer}>
        Магазин ракеток (с) Petr Zavadskii, 2026
      </footer>
    </html>
  );
}
