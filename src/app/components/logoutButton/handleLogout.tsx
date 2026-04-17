import { deleteUser } from "@/app/services/deleteUser";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
  await deleteUser();
  redirect("/");
};
