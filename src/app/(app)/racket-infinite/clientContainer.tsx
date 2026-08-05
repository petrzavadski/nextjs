"use client";
import { IRacket } from "@/app/types/racket";
import useSWRInfinite from "swr/infinite";
import { getKey } from "./get-key";
import { FC, ReactNode } from "react";
import { LIMIT } from "./constants";
import { Scroller } from "./scroller";
import { fetcherInfinite } from "@/app/lib/fetcher";

type Props = {
  initialDate: IRacket[] | undefined;

  children?: ReactNode;
  userLogin: string | undefined;
};

export const RacketInfiniteContainer: FC<Props> = ({
  initialDate,
  userLogin,
  children,
}) => {
  const { data, error, isLoading, size, setSize } = useSWRInfinite<IRacket[]>(
    getKey,
    fetcherInfinite,
    {
      revalidateFirstPage: false,
      revalidateIfStale: false,
      parallel: true,
      fallbackData: initialDate ? [initialDate] : undefined,
    },
  );

  const rackets: IRacket[] = data ? ([] as IRacket[]).concat(...data) : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  if (isLoading && !rackets.length) {
    return `initial loading`;
  }
  if (error) {
    return "some error";
  }

  if (isEmpty) return "is Empty";

  return (
    <Scroller
      isReachingEnd={isReachingEnd}
      isLoadingMore={isLoadingMore}
      setSize={setSize}
      size={size}
      rackets={rackets}
      userLogin={userLogin}
    >
      {children}
    </Scroller>
  );
};
