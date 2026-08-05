// src/app/components/racketMini/racket.tsx
"use client";

import { FC } from "react";
import Image from "next/image";
import styles from "./racket.module.css";
import Link from "next/link";
import { BASE_CLIENT_URL } from "@/app/constants/service";
import { FavoriteButton } from "../favoriteButton/favoriteButton";
import { Icon } from "../icon/icon";

type RacketData = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  userData?: {
    isFavorite: boolean;
  };
};

type Props = {
  racket: RacketData;
  userLogin?: string;
};

export const RacketMiniClient: FC<Props> = ({ racket, userLogin }) => {
  const { id, name, imageUrl, userData } = racket;
  const isFavorite = userData?.isFavorite ?? false;

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {userLogin && <Icon racketId={id} isFavoriteInitial={isFavorite} />}
        <Link href={`${BASE_CLIENT_URL}${id}`}>
          <Image
            src={imageUrl}
            alt={name || "Racket image"}
            width={0}
            height={0}
            className={styles.image}
            unoptimized
          />
        </Link>
      </div>
      <div className={styles.value}>Модель ракетки: {name}</div>

      {userLogin && (
        <FavoriteButton
          userLogin={userLogin}
          racketId={id}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
};
