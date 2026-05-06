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
  const userLogin = userRawData?.login;
  const serverIsFavorite = userRawData?.userData?.isFavorite;

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
    <RacketClient
      id={id}
      data={data}
      userLogin={userLogin}
      serverIsFavorite={Boolean(serverIsFavorite)}
    />
  );
};
