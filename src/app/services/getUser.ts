"use server";
import { cookies } from "next/headers";
import { BASE_API_URL } from "../constants/service";
import { IUser } from "../types/user";
import { Response } from "../types/request";

export const getUser = async (): Response<IUser> => {
  const cookieStore = await cookies();

  const result = await fetch(`${BASE_API_URL}auth/user`, {
    credentials: "include",
    headers: { Cookie: cookieStore.toString() },
  });

  if (result.status == 401) {
    return { isError: true, data: undefined };
  }

  if (result.status !== 200) {
    return { isError: true, data: undefined };
  }

  const data: { user: IUser } = await result.json();

  return { isError: false, data: data.user };
};

export const getUserLogin = async (): Promise<string | undefined> => {
  const response = await getUser();
  const userRawData = response.data;
  return userRawData?.login;
};
