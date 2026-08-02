import { cookies } from "next/headers";
import { BASE_API_URL } from "../constants/service";
import { Response } from "../types/request";
import { Brand } from "../types/brands";

export const getBrands = async (): Response<Brand[]> => {
  const cookieStore = await cookies();

  const result = await fetch(`${BASE_API_URL}brands`, {
    credentials: "include",
    headers: { Cookie: cookieStore.toString() },
  });

  if (result.status == 401) {
    return { isError: true, data: undefined };
  }

  if (result.status !== 200) {
    return { isError: true, data: undefined };
  }

  const allBrands = await result.json();

  return { isError: false, data: allBrands };
};
