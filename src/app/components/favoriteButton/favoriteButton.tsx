"use client";

import { use } from "react";
import { UserContext } from "@/app/providers/UserProvider";
import styles from "./favoriteButton.module.css";

type Props = {
  userLogin?: string;
};

export const FavoriteButton = ({ userLogin }: Props) => {
  const context = use(UserContext);
  const user = context?.user;

  console.log("favorite button user ", user);

  // Показываем кнопку только если пользователь авторизован
  if (!user || !userLogin) return null;

  return (
    <button className={styles.bookmarkButton}>Добавить в избранное</button>
  );
};
