import { IRacket } from "@/app/types/racket";
import { BASE_API_URL } from "@/app/constants/service";

export const fetcher = async (path: string | IRacket[] | undefined) => {
  if (typeof path !== "string" && path !== undefined) {
    return path;
  }

  const result = await fetch(`${BASE_API_URL}${path}`, {
    credentials: "include",
  });

  return result.json();
};
