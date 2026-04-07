"use client";
import { createContext, useState } from "react";
import { IUser } from "../types/user";

interface UserContextType {
  user: IUser | undefined;
  logout: () => void; // добавляем метод для выхода
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

  const logout = () => setUser(undefined);

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};
