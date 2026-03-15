"use client";
import { createContext, useState } from "react";
import { IUser } from "../types/user";

interface UserContextType {
  user: IUser | undefined;
  login: (userData: IUser) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
export const UserProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: IUser;
}) => {
  const [user, setUser] = useState<IUser | undefined>(initialUser);

  const login = (userData: IUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(undefined);
  };

  return <UserContext value={{ user, login, logout }}>{children}</UserContext>;
};
