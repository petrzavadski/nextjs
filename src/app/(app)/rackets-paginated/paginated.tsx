"use client";

import { fetcherPaginated } from "@/app/lib/fetcher";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { PaginatedPage } from "./paginated-container";

import { LIMIT } from "../racket-infinite/constants";
import { Brands } from "@/app/components/brandList/brands";
import { getUser } from "@/app/services/getUser";
import { getBrands } from "@/app/services/getBrands";
import { useRouter } from "next/navigation";

export const RacketPaginatedContainer = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "") || 1;

  const brand = searchParams.get("brand") ?? undefined;

  const router = useRouter();

  const { data, isLoading, error } = useSWR(
    brand
      ? `products?page=${page}&brand=${brand}&limit=${LIMIT}`
      : `products?page=${page}&limit=${LIMIT}`,
    fetcherPaginated,
    {
      revalidateIfStale: false,
      onError: (err) => console.error("SWR error", err),
      onSuccess: (data) => console.log("success swr data", data),
    },
  );

  const { data: nextPage } = useSWR(
    brand
      ? `products?page=${page + 1}&brand=${brand}&limit=${LIMIT + 1}`
      : `products?page=${page + 1}&limit=${LIMIT + 1}`,
    fetcherPaginated,
    {
      revalidateIfStale: false,
      onError: (err) => console.error("SWR error", err),
      onSuccess: (data) => console.log("success swr data", data),
    },
  );

  // Запрос пользователя (кешируется автоматически)
  const { data: userData } = useSWR("/api/user", getUser);

  const { data: brands } = useSWR("/api/brands", getBrands);

  const allBrands = brands?.data;

  const userLogin = userData?.data?.login;

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", LIMIT.toString());

    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };

  if (error) return "some error";

  if (isLoading) return "swr loading ...";

  if (!data) return "empty";

  const hasNext = Array.isArray(nextPage) && nextPage.length !== 0;

  return (
    <div>
      <Brands brands={allBrands} />

      <PaginatedPage data={data} userLogin={userLogin} />

      <div>
        {page > 1 && <button onClick={() => updatePage(page - 1)}>PREV</button>}
        <div>Page #{page}</div>

        {hasNext && <button onClick={() => updatePage(page + 1)}>NEXT</button>}
      </div>
    </div>
  );
};
