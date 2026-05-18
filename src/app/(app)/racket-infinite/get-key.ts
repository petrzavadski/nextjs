import { IRacket } from "@/app/types/racket";
import { LIMIT } from "./constants";

export const getKey = (initialData: IRacket[] | undefined) => {
  return (page: number) => {
    if (page === 0 && typeof window !== undefined && initialData) {
      return initialData;
    }
    return `products?page=${page + 1}&limit=${LIMIT}`;
  };
};
