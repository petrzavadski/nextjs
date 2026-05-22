import { BASE_API_URL } from "@/app/constants/service";
import { IRacket } from "@/app/types/racket";

export const fetcher = async (path: string | IRacket[] | undefined) => {
  const result = await fetch(`${BASE_API_URL}${path}`, {
    credentials: "include",
    cache: "no-store", // отключаем кэш
  });
  const res = await result.json();

  return res;
};
