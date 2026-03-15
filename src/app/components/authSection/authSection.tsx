"use client";

import { UserContext } from "@/app/providers/UserProvider";
import Link from "next/link";
import { use } from "react";

export const AuthSection = () => {
  const context = use(UserContext);

  if (!context) return <Link href="/login">Login</Link>;

  const user = context.user;

  return user ? (
    <>
      {/* <div>Hello, {user.login}</div>
      <LogoutButton /> */}
    </>
  ) : (
    <Link href={"/auth"}>Зарегистрироваться</Link>
  );
};
