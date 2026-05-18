"use client";
import { UserContext } from "@/app/providers/UserProvider";
import Link from "next/link";
import { use } from "react";
import { LogoutButton } from "../logoutButton/logoutButton";
import { useRouter } from "next/navigation";

export const LoginSection = () => {
  const context = use(UserContext);
  const router = useRouter();

  if (!context) return <Link href="/login">Login</Link>;

  const user = context.user;

  return user ? (
    <>
      <div>Hello, {user.login}</div>

      <LogoutButton />
    </>
  ) : (
    <button onClick={() => router.push("/login")}>Войти</button>
  );
};

export const AuthSection = () => {
  const context = use(UserContext);

  if (!context) return <Link href="/login">Login</Link>;

  const user = context.user;

  if (!user) {
    return <Link href={"/auth"}>Зарегистрироваться</Link>;
  }
  return null;
};
