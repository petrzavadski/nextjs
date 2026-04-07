"use client";
import { UserContext } from "@/app/providers/UserProvider";
import Link from "next/link";
import { use, useTransition } from "react";
import styles from "./logoutButton.module.css";
import { deleteUser } from "@/app/services/deleteUser";
import { redirect } from "next/navigation";

export const LogoutButton = () => {
  const handleLogout = async () => {
    deleteUser();
    logout();
    redirect("/");
  };
  const context = use(UserContext);
  const [isPending, startTransition] = useTransition();

  if (!context) return null;
  const { user, logout } = context;

  if (!user) return null;

  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        startTransition(handleLogout);
      }}
      className={isPending ? styles.pending : styles.logoutLink}
    >
      Logout
    </Link>
  );
};
