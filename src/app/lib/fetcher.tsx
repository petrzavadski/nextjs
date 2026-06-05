import { BASE_API_URL } from "@/app/constants/service";
import { IRacket } from "@/app/types/racket";

export const fetcherInfinite = async (path: string | IRacket[] | undefined) => {
  const result = await fetch(`${BASE_API_URL}${path}`, {
    credentials: "include",
    cache: "no-store", // отключаем кэш
  });
  const res = await result.json();

  return res;
};

export const fetcherPaginated = async (
  path: string | IRacket[] | undefined,
) => {
  if (typeof path !== "string") throw Error("fetcher expected a string URL");
  const result = await fetch(`${BASE_API_URL}${path}`, {
    credentials: "include",
    cache: "no-store", // отключаем кэш
  });

  if (!result.ok) throw Error(`HTTP ${result.status}: ${result.statusText}`);
  const res = await result.json();

  return res;
};
