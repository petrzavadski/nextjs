import { IRacket } from "../types/racket";
import { Response } from "../types/request";

type Params = {
  page?: number;
  limit?: number;
};

export const getRackets = async ({}: Params = {}): Promise<
  Response<IRacket[]>
> => {
  // Используем мок данные вместо API запроса
  // Имитируем задержку сети для реалистичности
  await new Promise((resolve) => setTimeout(resolve, 500));

  //console.log("📦 Returning mock data:", paginatedData);

  return {
    isError: false,
  };
};
