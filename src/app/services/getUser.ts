import { cookies } from "next/headers";
import { BASE_API_URL } from "../constants/service";
import { IUser } from "../types/user";
import { Response } from "../types/request";

export const getUser = async (): Response<IUser> => {
  const coockieStore = await cookies();

  const result = await fetch(`${BASE_API_URL}auth/user`, {
    credentials: "include",
    headers: { Cookie: coockieStore.toString() },
  });

  if (result.status == 401) {
    return { isError: false, data: undefined };
  }

  if (result.status !== 200) {
    return { isError: true, data: undefined };
  }

  const data: { user: IUser } = await result.json();

  return { isError: false, data: data.user };
};
