import { FC } from "react";
import { RacketPaginatedContainer } from "./paginated";
import { SWRConfig } from "swr";
import { LIMIT } from "../racket-infinite/constants";
import { getRackets } from "@/app/services/getRackets";
import { getBrands } from "@/app/services/getBrands";
const Page: FC<PageProps<"/rackets-paginated">> = async ({ searchParams }) => {
  const { page } = await searchParams;
  const { brand } = await searchParams;

  let PageNumber = 1;

  if (typeof page === "string") {
    PageNumber = parseInt(page) || 1;
  }

  let url = `products?page=${PageNumber}&limit=${LIMIT}`;

  if (brand) {
    url += `&brand=${brand.toString()}`;
  }

  const { data } = await getRackets({
    page: PageNumber,
    limit: LIMIT,
    brand: brand?.toString(),
  });

  const brandsData = await getBrands();

  const initialBrands = brandsData?.data ?? [];

  initialBrands.push({ name: "-- Выберите бренд --", id: -1 });

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
