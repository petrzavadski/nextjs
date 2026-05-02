import { cookies } from "next/headers";
import { BASE_API_URL } from "../constants/service";
import { IRacket } from "../types/racket";
import { Response } from "../types/request";

export const getRacketById = async (racketId: string): Response<IRacket> => {
  const cookieStore = await cookies();

  const result = await fetch(`${BASE_API_URL}/product/${racketId}`, {
    next: { revalidate: 20 },
    credentials: "include",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (result.status === 404) return { isError: false, data: undefined };

  if (!result.ok) return { isError: true, data: undefined };

  const pureProduct = await result.json();

  const product = pureProduct.product;

  return { isError: false, data: product };
};
