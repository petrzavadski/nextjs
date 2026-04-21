"use server";
import { cookies } from "next/headers";
import { BASE_API_URL } from "../constants/service";
import { IUser } from "../types/user";
import { Response } from "../types/request";

export const deleteUser = async (): Response<IUser> => {
  const cookieStore = await cookies();

  const result = await fetch(`${BASE_API_URL}auth/logout`, {
    credentials: "include",
    headers: { Cookie: cookieStore.toString() },
    method: "DELETE",
  });

  try {
    cookieStore.delete("user");
  } catch (error) {
    console.log(`Error deleting cookie1: ${error}`);
  }

  console.log("delete" + result.status);

  if (result.status == 401) {
    return { isError: false, data: undefined };
  }

  if (result.status !== 200) {
    return { isError: true, data: undefined };
  }

  return { isError: false, data: undefined };
};
