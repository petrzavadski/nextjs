"use client";
import { BASE_API_URL } from "@/app/constants/service";
import { UserContext } from "@/app/providers/UserProvider";
import Link from "next/link";
import { use, useTransition } from "react";

const handleLogout = async () => {
  await fetch(`${BASE_API_URL}auth/logout`, {
    credentials: "include",
    method: "DELETE",
  });
};
export const LogoutButton = () => {
  const user = use(UserContext);

  const [isPending, startTransition] = useTransition();

  if (!user) {
    return null;
  }
  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        user.logout();
        startTransition(handleLogout);
      }}
      style={{
        pointerEvents: isPending ? "none" : "auto",
        opacity: isPending ? 0.5 : 1,
      }}
    >
      Logout
    </Link>
  );
};
