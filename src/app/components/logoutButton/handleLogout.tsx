"use client";
import { logout } from "@/app/services/logout";
import { redirect, useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();

    router.refresh();
    redirect("/");
  };

  return handleLogout;
};
