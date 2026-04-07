"use server";
import { cookies } from "next/headers";
import { BASE_API_URL } from "../constants/service";
import { IUser } from "../types/user";
import { Response } from "../types/request";

export const deleteUser = async (): Response<IUser> => {
  const coockieStore = await cookies();

  coockieStore.delete("user");
  const result = await fetch(`${BASE_API_URL}auth/logout`, {
    credentials: "include",
    method: "DELETE",
  });

  if (result.status == 401) {
    return { isError: false, data: undefined };
  }

  if (result.status !== 200) {
    return { isError: true, data: undefined };
  }

  return { isError: false, data: undefined };
};
