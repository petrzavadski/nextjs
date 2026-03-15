// "use client";
import styles from "./styles.module.css";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import "./global.css";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { getUser } from "./services/getUser";
import { UserProvider } from "./providers/UserProvider";

export const metadata: Metadata = {
  title: "Tenis racket shop",
  description: "Rackets for all types of people",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getUser();
  return (
    <html lang="en">
      <UserProvider initialUser={data}>
        <NextTopLoader />
        <body className={styles.content}>
          <Header />
          {children}
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
