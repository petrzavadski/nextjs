import { getRacketById } from "@/app/services/getRacketById";
import { FC } from "react";
import Image from "next/image";
import styles from "./racket.module.css";
import { notFound } from "next/navigation";

type Props = {
  id: string;
};

export const Racket: FC<Props> = async ({ id }) => {
  const { isError, data } = await getRacketById(id);

  if (isError) {
    return (
      <div className={styles.errorContainer}>
        <div>😕 Some error occurred. Please try again later.</div>
      </div>
    );
  }

  if (!data) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
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
    </div>
  );
};
