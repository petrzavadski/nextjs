import { getRacketById } from "@/app/services/getRacketById";
import { FC } from "react";
import styles from "./racket.module.css";
import { notFound } from "next/navigation";
import { getUser } from "@/app/services/getUser";
import { Icon } from "../icon/icon";
import { FavoriteButton } from "../favoriteButton/favoriteButton";
import Image from "next/image";

type Props = {
  id: string;
};

export const Racket: FC<Props> = async ({ id }) => {
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

        <Image
          src={data.imageUrl}
          alt={data.name || "Racket image"}
          width={0}
          height={0}
          loading="lazy"
          className={styles.image}
          unoptimized
        />
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
        <span className={`${styles.value} ${styles.model}`}>{data.model}</span>
      </div>

      <div className={styles.infoItem}>
        <span className={styles.label}>Год выпуска</span>
        <span className={`${styles.value} ${styles.year}`}>{data.year}</span>
      </div>

      <div className={`${styles.infoItem} ${styles.description}`}>
        <span className={styles.label}>Описание</span>
        <span className={styles.value}>{data.description}</span>
      </div>

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
