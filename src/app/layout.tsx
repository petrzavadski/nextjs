// "use client";
import styles from "./styles.module.css";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import "./global.css";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Tenis racket shop",
  description: "Rackets for all types of people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextTopLoader />
      <body className={styles.content}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
