"use client";
import { FavoriteButton } from "@/app/components/favoriteButton/favoriteButton";
import { Icon } from "@/app/components/icon/icon";
import { IRacket } from "@/app/types/racket";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
import styles from "./racket.module.css";
import { BASE_CLIENT_URL } from "@/app/constants/service";

interface ScrollerProps {
  isReachingEnd: boolean | undefined;
  isLoadingMore: boolean | undefined;
  setSize: (size: number | ((prevSize: number) => number)) => void;
  size: number;
  children: ReactNode;
  rackets: IRacket[];
  userLogin: string | undefined;
}

export const Scroller: FC<ScrollerProps> = ({
  isReachingEnd,
  isLoadingMore,
  setSize,
  size,
  children,
  rackets,
  userLogin,
}) => {
  return (
    <div className={styles.buttonParent}>
      {children}
      <RacketsLoad rackets={rackets} userLogin={userLogin} />
      {!isReachingEnd && (
        <button
          disabled={isLoadingMore}
          className={styles.bookmarkButton}
          onClick={() => setSize(size + 1)}
        >
          Загрузить еще...
        </button>
      )}
    </div>
  );
};

const RacketsLoad = ({
  rackets,
  userLogin,
}: {
  rackets: IRacket[];
  userLogin: string | undefined;
}) => {
  return (
    <ul>
      {rackets.map((racket) => {
        const isFavorite = racket?.userData?.isFavorite;
        return (
          <div key={racket.id} className={styles.container}>
            <div className={styles.imageWrapper}>
              <Icon racketId={racket.id} isFavoriteInitial={isFavorite} />
              <Link href={`${BASE_CLIENT_URL}${racket.id}`}>
                <Image
                  src={racket.imageUrl}
                  alt={racket.name || "Racket image"}
                  width={0}
                  height={0}
                  className={styles.image}
                  unoptimized
                />
              </Link>
            </div>

            <div className={styles.value}>
              Модель ракетки: {racket.name}
              {userLogin && (
                <FavoriteButton
                  userLogin={userLogin}
                  racketId={racket.id}
                  isFavorite={isFavorite}
                />
              )}
            </div>
          </div>
        );
      })}
    </ul>
  );
};
