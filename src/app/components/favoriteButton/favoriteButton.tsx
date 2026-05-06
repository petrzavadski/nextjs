"use client";

import { use, useTransition, useCallback } from "react";
import { UserContext } from "@/app/providers/UserProvider";
import styles from "./favoriteButton.module.css";
import { FC, useState, useEffect } from "react";
import { handleFavorite } from "./handleClick";
import {
  useSetIsFavorite,
  useIsFavoriteById,
} from "@/app/providers/FavoriteProvider";

type Props = {
  userLogin?: string;
  racketId: string;
  isFavorite: boolean;
};

export const FavoriteButton: FC<Props> = ({
  userLogin,
  racketId,
  isFavorite: isFavoriteInitial,
}) => {
  const setIsFavorite = useSetIsFavorite();
  const context = use(UserContext);
  const user = context?.user;

  // Используем глобальное состояние для надежности
  const globalIsFavorite = useIsFavoriteById({
    id: racketId,
    isFavoriteInitial: isFavoriteInitial,
  });

  // Локальное состояние для оптимистичного обновления
  const [optimisticIsFavorite, setOptimisticIsFavorite] =
    useState(globalIsFavorite);

  // Синхронизируем локальное состояние с глобальным
  useEffect(() => {
    setOptimisticIsFavorite(globalIsFavorite);
  }, [globalIsFavorite]);

  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(() => {
    if (isPending) return; // Предотвращаем множественные клики

    startTransition(async () => {
      const newFavoriteState = !optimisticIsFavorite;

      // Оптимистичное обновление UI
      setOptimisticIsFavorite(newFavoriteState);

      // Отправка запроса на сервер
      const response = await handleFavorite({
        racketId,
        isFavorite: newFavoriteState,
      });

      if (response?.ok) {
        // Если запрос успешен - обновляем глобальное состояние
        setIsFavorite({ id: racketId, isFavorite: newFavoriteState });
      } else {
        // Если ошибка - откатываем
        console.error("Ошибка при сохранении:", response?.message);
        setOptimisticIsFavorite(!newFavoriteState);
      }
    });
  }, [optimisticIsFavorite, racketId, setIsFavorite, isPending]);

  if (!user || !userLogin) return null;

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className={`${styles.bookmarkButton} ${isPending ? styles.pending : ""}`}
    >
      {isPending
        ? "Загрузка..."
        : optimisticIsFavorite
          ? "Удалить из избранного"
          : "Добавить в избранное"}
    </button>
  );
};
