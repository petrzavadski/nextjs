"use server";
import { cookies } from "next/headers";
import { BASE_API_URL } from "../constants/service";
import { BrandsResponse } from "../types/brands";
import { Response } from "../types/request";

export const getBrands = async (): Response<BrandsResponse> => {
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

  // const resultBrands = data.map((item: IBrands) => item.name);
  return { isError: false, data: allBrands };
};
