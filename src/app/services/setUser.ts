import { cookies } from "next/headers";
import { IUser } from "../types/user";
import { Response } from "../types/request";

export const setUser = async (user: IUser): Response<IUser> => {
  const coockieStore = await cookies();

  coockieStore.set("user", JSON.stringify(user));

  return { isError: false, data: user };
};
