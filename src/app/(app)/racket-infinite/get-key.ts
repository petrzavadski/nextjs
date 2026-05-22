import { IRacket } from "@/app/types/racket";

export const getKey = (pageIndex: number, previousPageData: IRacket[]) => {
  // pageIndex: 0, 1, 2... - индекс загружаемой страницы
  // previousPageData: данные предыдущей страницы или null для первой

  if (previousPageData && !previousPageData.length) {
    return null; // достигли конца — дальше не грузим
  }

  return `products?page=${pageIndex + 1}&limit=5`; // URL для этой страницы
};
