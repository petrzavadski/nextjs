"use client";
import { UserContext } from "@/app/providers/UserProvider";
// import Link from "next/link";
import { use, useTransition } from "react";
import styles from "./logoutButton.module.css";
import { handleLogout } from "./handleLogout";

export const LogoutButton = () => {
  const context = use(UserContext);
  const [isPending, startTransition] = useTransition();

  if (!context) return null;

  const { user } = context;

  if (!user) return null;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        startTransition(handleLogout);
      }}
      className={isPending ? styles.pending : styles.logoutLink}
    >
      Logout
    </button>
  );
};
