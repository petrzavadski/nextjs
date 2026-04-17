import { cookies } from "next/headers";
import { IUser } from "../types/user";
import { Response } from "../types/request";

export const setUser = async (user: IUser | undefined): Response<IUser> => {
  const coockieStore = await cookies();

  coockieStore.set({ name: "user", value: JSON.stringify(user) });

  return { isError: false, data: user };
};
