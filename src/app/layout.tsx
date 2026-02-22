// import Link from "next/link";
"use client";
import styles from "./styles.module.css";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import "./global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={styles.content}>
        <Header />
        {/* <body className={styles.content}>{children}</body>
         */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
