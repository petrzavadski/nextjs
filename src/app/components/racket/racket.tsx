import { getRacketById } from "@/app/services/getRacketById";
import { FC } from "react";
import styles from "./racket.module.css";
import { notFound } from "next/navigation";
import { getUser } from "@/app/services/getUser";
import { RacketClient } from "./RacketClient";

type Props = {
  id: string;
};

export const Racket: FC<Props> = async ({ id }) => {
  const { isError, data } = await getRacketById(id);

  const response = await getUser();
  const userRawData = response.data;
<<<<<<< Updated upstream
  const userLogin = userRawData?.login;
  const serverIsFavorite = userRawData?.userData?.isFavorite;
=======

  const userLogin = userRawData?.login; // передадим в клиентскую кнопку
>>>>>>> Stashed changes

  const isFavorite = data?.userData?.isFavorite;

  console.log({ isFavorite });
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
<<<<<<< Updated upstream
    <RacketClient
      id={id}
      data={data}
      userLogin={userLogin}
      serverIsFavorite={Boolean(serverIsFavorite)}
    />
=======
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {Boolean(isFavorite) && (
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
        racketId={id}
        isFavorite={Boolean(isFavorite)}
        // isFavorite={true}
      />
    </div>
>>>>>>> Stashed changes
  );
};
