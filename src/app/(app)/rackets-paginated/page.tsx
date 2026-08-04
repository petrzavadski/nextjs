import { FC } from "react";
import { RacketPaginatedContainer } from "./paginated";
import { SWRConfig } from "swr";
import { LIMIT } from "../racket-infinite/constants";
import { getRackets } from "@/app/services/getRackets";
import { getBrands } from "@/app/services/getBrands";

const Page: FC<PageProps<"/rackets-paginated">> = async ({ searchParams }) => {
  const { page, brand } = await searchParams;

  let PageNumber = 1;

  if (typeof page === "string") {
    PageNumber = parseInt(page) || 1;
  }

  let url = `products?page=${PageNumber}&limit=${LIMIT}`;

  if (brand) {
    url += `&brand=${brand.toString()}`;
  }

  const [racketsResults, brandResult] = await Promise.allSettled([
    getRackets({
      page: PageNumber,
      limit: LIMIT,
      brand: brand?.toString(),
    }),
    getBrands(),
  ]);

  let data;

  if (racketsResults.status === "fulfilled") {
    data = racketsResults.value.data;
  } else {
    data = { items: [], total: 0 };
  }

  let brandsData: Array<{ name: string; id: number }> = [];

  if (brandResult.status === "fulfilled") {
    brandsData = brandResult.value.data ?? [];
  }

  const initialBrands = [
    { name: "-- Выберите бренд --", id: -1 },
    ...brandsData,
  ];

  return (
    <SWRConfig
      value={{
        fallback: { [url]: data },
      }}
    >
      <RacketPaginatedContainer brands={initialBrands} />
    </SWRConfig>
  );
};

export default Page;
