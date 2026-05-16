"use client";

import { UserContext } from "./UserContext";
import { IUser } from "../types/user";

export default function ClientUserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: IUser | undefined;
}) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
