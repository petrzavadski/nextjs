"use client";

<<<<<<< Updated upstream
import { use, useTransition, useCallback } from "react";
import { UserContext } from "@/app/providers/UserProvider";
import styles from "./favoriteButton.module.css";
import { FC, useState, useEffect } from "react";
import { handleFavorite } from "./handleClick";
import {
  useSetIsFavorite,
  useIsFavoriteById,
} from "@/app/providers/FavoriteProvider";
=======
import { FC, use, useTransition, useState } from "react";
import { UserContext } from "@/app/providers/UserProvider";
import styles from "./favoriteButton.module.css";
import { useHandleFavorite } from "./handleClick";
import { useRouter } from "next/navigation";
>>>>>>> Stashed changes

type Props = {
  racketId: string;
  isFavorite: boolean;
  userLogin?: string;
  racketId: string;
  isFavorite: boolean;
};

export const FavoriteButton: FC<Props> = ({
  userLogin,
  racketId,
<<<<<<< Updated upstream
  isFavorite: isFavoriteInitial,
}) => {
  const setIsFavorite = useSetIsFavorite();
=======
  isFavorite: initialIsFavorite,
}: Props) => {
>>>>>>> Stashed changes
  const context = use(UserContext);
  const user = context?.user;
  const router = useRouter();

<<<<<<< Updated upstream
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
=======
  const [isPending, startTransition] = useTransition();
  const [localIsFavorite, setLocalIsFavorite] = useState(initialIsFavorite);

  // Используем хук правильно - на верхнем уровне компонента
  const { handleClick } = useHandleFavorite({
    racketId,
    isFavorite: localIsFavorite,
  });

  // Обработчик клика с переходом
  const onClickHandler = () => {
    startTransition(async () => {
      const newFavoriteState = await handleClick();
      setLocalIsFavorite(newFavoriteState);
      router.refresh();
    });
  };
>>>>>>> Stashed changes

  if (!user || !userLogin) return null;

  return (
    <button
      disabled={isPending}
<<<<<<< Updated upstream
      onClick={handleClick}
      className={`${styles.bookmarkButton} ${isPending ? styles.pending : ""}`}
    >
      {isPending
        ? "Загрузка..."
        : optimisticIsFavorite
=======
      className={styles.bookmarkButton}
      onClick={onClickHandler}
    >
      {isPending
        ? "Загрузка..."
        : localIsFavorite
>>>>>>> Stashed changes
          ? "Удалить из избранного"
          : "Добавить в избранное"}
    </button>
  );
};
