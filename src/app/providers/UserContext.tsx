"use client";
import { createContext, useContext } from "react";
import { IUser } from "../types/user";

interface UserContextType {
  user: IUser | undefined;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
