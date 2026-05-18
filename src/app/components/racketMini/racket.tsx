import { getRacketById } from "@/app/services/getRacketById";
import { FC } from "react";
import Image from "next/image";
import styles from "./racket.module.css";
import Link from "next/link";
import { BASE_CLIENT_URL } from "@/app/constants/service";
import { notFound } from "next/navigation";
import { FavoriteButton } from "../favoriteButton/favoriteButton";
import { getUser } from "@/app/services/getUser";
import { Icon } from "../icon/icon";

type Props = {
  id: string;
};

export const RacketMini: FC<Props> = async ({ id }) => {
  const { isError, data } = await getRacketById(id);

  if (isError) {
    return (
      <div className={styles.errorContainer}>
        <div>Ошибка!!!!</div>
      </div>
    );
  }

  if (!data) {
    return notFound();
  }

  const isFavorite = data?.userData?.isFavorite;

  const response = await getUser();
  const userRawData = response.data;
  const userLogin = userRawData?.login;

  if (isError) {
    return (
      <div className={styles.errorContainer}>
        <div>Ошибка!!!!</div>
      </div>
    );
  }

  if (!data) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Icon racketId={id} isFavoriteInitial={isFavorite} />
        <Link href={`${BASE_CLIENT_URL}${id}`}>
          <Image
            src={data.imageUrl}
            alt={data.name || "Racket image"}
            width={0}
            height={0}
            className={styles.image}
            unoptimized
          />
        </Link>
      </div>
      <div className={styles.value}>Модель ракетки: {data.name}</div>

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
