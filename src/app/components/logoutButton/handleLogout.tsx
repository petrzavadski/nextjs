import { logout } from "@/app/services/logout";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
  await logout();
  redirect("/");
};
