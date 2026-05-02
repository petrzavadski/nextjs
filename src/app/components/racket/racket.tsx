import { getRacketById } from "@/app/services/getRacketById";
import { FC } from "react";
import Image from "next/image";
import styles from "./racket.module.css";
import { notFound } from "next/navigation";
import { getUser } from "@/app/services/getUser";
import { FavoriteButton } from "../favoriteButton/favoriteButton";

type Props = {
  id: string;
};

export const Racket: FC<Props> = async ({ id }) => {
  const { isError, data } = await getRacketById(id);

  let isFavorite: boolean | undefined = undefined;

  const response = await getUser();
  const userRawData = response.data;

  isFavorite = userRawData?.userData?.isFavorite;
  const userLogin = userRawData?.login; // передадим в клиентскую кнопку

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

  console.log({data});
  console.log('isFavorite ', isFavorite);

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

      <FavoriteButton userLogin={userLogin} rackeId={data.id} isFavorite={Boolean(isFavorite)}/>
    </div>
  );
};
