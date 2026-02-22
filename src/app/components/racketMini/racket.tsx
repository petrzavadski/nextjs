import { getRacketById } from "@/app/services/getRacketById";
import { FC } from "react";
import Image from "next/image";
import styles from "./racket.module.css";
import Link from "next/link";
import { BASE_CLIENT_URL } from "@/app/constants/service";
import { notFound } from "next/navigation";

type Props = {
  id: string;
};

export const RacketMini: FC<Props> = async ({ id }) => {
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
    </div>
  );
};
