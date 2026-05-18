"use client";
import { IRacket } from "@/app/types/racket";
import useSWRInfinite from "swr/infinite";
import { getKey } from "./get-key";
import { FC } from "react";
import { LIMIT } from "./constants";
import Rackets from "../rackets/page";
import { fetcher } from "./serverContainer";

type Props = {
  initialDate: IRacket[] | undefined;
};

export const RacketInfiniteContainer: FC<Props> = ({ initialDate }) => {
  const { data, error, isLoading, size, setSize } = useSWRInfinite<IRacket[]>(
    getKey(initialDate),
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateIfStale: false,
      parallel: true,
    },
  );

  const products: IRacket[] = data ? ([] as IRacket[]).concat(...data) : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  if (isLoading && !products.length) {
    return "initial loading";
  }
  if (error) {
    return "some error";
  }

  if (isEmpty) return "is Empty";
  return (
    <div>
      <Rackets />

      {isReachingEnd && (
        <button disabled={isLoadingMore} onClick={() => setSize(size + 1)}>
          Загрузить еще...
        </button>
      )}
    </div>
  );
};
