import useSWR from "swr";
import { getBrands } from "./getBrands";

export function useBrandServer() {
  const { data } = useSWR("api/brands", getBrands);

  return data;
}
