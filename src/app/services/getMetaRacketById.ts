import { BASE_API_URL } from "../constants/service";
import { IRacket } from "../types/racket";
import { Response } from "../types/request";

export const getMetaRacketById = async (
  racketId: string,
): Response<IRacket> => {
  const result = await fetch(`${BASE_API_URL}/meta/product/${racketId}`);

  if (result.status === 404) return { isError: false, data: undefined };

  if (!result.ok) return { isError: true, data: undefined };

  const pureProduct = await result.json();

  const product = pureProduct.product;

  return { isError: false, data: product };
};
