import { FC } from "react";
import { RacketPaginatedContainer } from "./paginated";
import { SWRConfig } from "swr";
import { LIMIT } from "../racket-infinite/constants";
import { getRackets } from "@/app/services/getRackets";
const Page: FC<PageProps<"/rackets-paginated">> = async ({ searchParams }) => {
  const { page } = await searchParams;

  let PageNumber = 1;

  if (typeof page === "string ") {
    PageNumber = parseInt(page) || 1;
  }

  const { data } = await getRackets({ page: PageNumber, limit: LIMIT });

  return (
    <SWRConfig
      value={{
        fallback: { [`products?page=${PageNumber}&LIMIT=${LIMIT}`]: data },
      }}
    >
      <RacketPaginatedContainer />
    </SWRConfig>
  );
};

export default Page;
