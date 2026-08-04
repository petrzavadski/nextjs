"use client";

import { fetcherPaginated } from "@/app/lib/fetcher";
import { useSearchParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import { PaginatedPage } from "./paginated-container";

import { LIMIT } from "../racket-infinite/constants";
import { Brands } from "@/app/components/brandList/brands";
import { useRouter } from "next/navigation";
import { use } from "react";
import { UserContext } from "@/app/providers/UserContext";
import { Brand } from "@/app/types/brands";

type Props = {
  brands: Brand[] | undefined;
};

export const RacketPaginatedContainer = ({ brands }: Props) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "") || 1;

  const brand = searchParams.get("brand") ?? undefined;

  const router = useRouter();

  let url = `products?page=${page}&limit=${LIMIT}`;

  if (brand) {
    url += `&brand=${brand}`;
  }

  const { data, isLoading, error } = useSWR(url, fetcherPaginated, {
    revalidateIfStale: false,
    onError: (err) => console.error("SWR error", err),
    onSuccess: (data) => console.log("success swr data", data),
  });

  const context = use(UserContext);

  if (!context) return null;

  const { user } = context;

  const userLogin = user?.login;
  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", LIMIT.toString());

    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };

  const updateBrand = (newBrandId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set(
      "brand",
      newBrandId === "-- Выберите бренд --" ? "" : newBrandId,
    );

    params.set("limit", LIMIT.toString());

    window.history.pushState(
      {},
      "",
      `?page=1&brand=${newBrandId}&limit=${LIMIT}`,
    );

    mutate(
      fetcherPaginated(`products?page=1&brand=${newBrandId}&limit=${LIMIT}`),
    );
  };

  if (error) return "some error";

  if (isLoading) return "swr loading ...";

  if (!data) return "empty";

  const hasNext = data.length === 5;

  return (
    <div>
      <Brands brands={brands} updateBrand={updateBrand} />
      <PaginatedPage data={data} userLogin={userLogin} />
      <div>
        {page > 1 && <button onClick={() => updatePage(page - 1)}>PREV</button>}
        <div>Page #{page}</div>

        {hasNext && <button onClick={() => updatePage(page + 1)}>NEXT</button>}
      </div>
    </div>
  );
};
