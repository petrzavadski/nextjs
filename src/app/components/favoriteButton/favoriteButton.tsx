"use client";

import { use, useCallback, useTransition } from "react";
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
  console.log({ isFavorite });

  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(async () => {
    startTransition(async () => {
      if (isPending) return;

      const newFavoriteState = !isFavorite;

      setIsFavorite({ id: racketId, isFavorite: newFavoriteState });

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
      }
    });
  }, [isFavorite, racketId, isPending, setIsFavorite, startTransition]);

  if (!user || !userLogin) return null;

  return (
    <div>
      {user && (
        <button
          disabled={isPending}
          onClick={handleClick}
          className={styles.bookmarkButton}
        >
          {!isPending
            ? isFavorite
              ? "Удалить из избранного"
              : "Добавить в избранное"
            : "Загрузка..."}
        </button>
      )}
    </div>
  );
};
