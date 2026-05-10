// [D:\nextjs\src\app\components\racket\RacketClient.tsx]
"use client";

import { FC } from "react";
import Image from "next/image";
import styles from "./racket.module.css";
import { FavoriteButton } from "../favoriteButton/favoriteButton";
import {
  useHydrateFavorite,
  useIsFavoriteById,
} from "@/app/providers/FavoriteProvider";
import { IRacket } from "@/app/types/racket";

type Props = {
  id: string;
  data: IRacket;
  userLogin?: string;
  serverIsFavorite: boolean;
};

export const RacketClient: FC<Props> = ({
  id,
  data,
  userLogin,
  serverIsFavorite,
}) => {
  // Хидратируем начальное состояние
  useHydrateFavorite({ id, isFavorite: serverIsFavorite });

  // Используем хук для получения текущего состояния из контекста
  const isFavorite = useIsFavoriteById({
    id,
    isFavoriteInitial: serverIsFavorite,
  });

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {isFavorite && (
          <Image
            src={"/bookmark.png"}
            alt={"bookmark"}
            width={50}
            height={50}
            className={styles.bookmark}
            unoptimized
          />
        )}

        <Image
          src={data.imageUrl}
          alt={data.name || "Racket image"}
          width={700}
          height={700}
          className={styles.image}
          unoptimized
        />
      </div>

      <div className={styles.infoGrid}>
        <div className={`${styles.infoItem} ${styles.name}`}>
          <span className={styles.label}>Наименование</span>
          <span className={styles.value}>{data.name}</span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Цена</span>
          <span className={`${styles.value} ${styles.price}`}>
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
              minimumFractionDigits: 0,
            }).format(data.price)}
          </span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Модель</span>
          <span className={`${styles.value} ${styles.model}`}>
            {data.model}
          </span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Год выпуска</span>
          <span className={`${styles.value} ${styles.year}`}>{data.year}</span>
        </div>

        <div className={`${styles.infoItem} ${styles.description}`}>
          <span className={styles.label}>Описание</span>
          <span className={styles.value}>{data.description}</span>
        </div>
      </div>

      <FavoriteButton
        userLogin={userLogin}
        racketId={data.id}
        isFavorite={isFavorite}
      />
    </div>
  );
};
