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
  const isFavorite = data?.userData?.isFavorite;

  const response = await getUser();
  const userRawData = response.data;
  const userLogin = userRawData?.login;

  console.log({ response });

  console.log("racket.tsx", { isFavorite });
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
      serverIsFavorite={Boolean(isFavorite)}
    />
  );
};
