"use client";
import { useIsFavoriteById } from "@/app/providers/FavoriteProvider";
import styles from "./racket.module.css";
import Image from "next/image";
import { FC } from "react";

type Props = {
  racketId: string;
  isFavoriteInitial: boolean | undefined;
};

export const Icon: FC<Props> = ({ racketId, isFavoriteInitial }) => {
  const isFavorite = useIsFavoriteById({
    id: racketId,
    isFavoriteInitial,
  });

  if (!isFavorite) return null;

  return (
    <Image
      src={"/bookmark.png"}
      alt={"bookmark"}
      width={50}
      height={50}
      className={styles.bookmark}
      unoptimized
    />
  );
};
