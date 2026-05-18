"use client";

import { use, useCallback, useState } from "react";
import { UserContext } from "@/app/providers/UserProvider";
import styles from "./favoriteButton.module.css";
import { FC } from "react";
import {
  useSetIsFavorite,
  useIsFavoriteById,
} from "@/app/providers/FavoriteProvider";
import { handleFavorite, revaliator } from "./handleClick";

type Props = {
  racketId: string;
  isFavorite: boolean;
  userLogin?: string;
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
  const isFavorite = useIsFavoriteById({
    id: racketId,
    isFavoriteInitial,
  });

  const [isPending, setIsPending] = useState(false);

  const handleClick = useCallback(async () => {
    if (isPending) return;

    const newFavoriteState = !isFavorite;

    setIsFavorite({ id: racketId, isFavorite: newFavoriteState });

    setIsPending(true);

    try {
      // Отправка запроса на сервер
      const response = await handleFavorite({
        racketId,
        isFavorite: newFavoriteState,
      });

      if (!response?.ok) {
        console.error("Ошибка при сохранении:", response?.message);
        setIsFavorite({ id: racketId, isFavorite: isFavorite });
      }
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      setIsFavorite({ id: racketId, isFavorite: isFavorite });
    } finally {
      revaliator(racketId);
      setIsPending(false);
    }
  }, [isFavorite, racketId, isPending, setIsFavorite]);

  if (!user || !userLogin) return null;

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isPending}
        className={`${styles.bookmarkButton} ${isPending ? styles.pending : ""}`}
      >
        {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      </button>
      {isPending && <span> ...Загрузка</span>}
    </div>
  );
};
