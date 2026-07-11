"use client";

import { fetcherPaginated } from "@/app/lib/fetcher";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { PaginatedPage } from "./paginated-container";

import { LIMIT } from "../racket-infinite/constants";
import { Brands } from "@/app/components/brandList/brands";
import { useRouter } from "next/navigation";
import { use } from "react";
import { UserContext } from "@/app/providers/UserContext";
import { useBrandServer } from "@/app/services/brandServer";

export const RacketPaginatedContainer = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "") || 1;

  const brand = searchParams.get("brand") ?? undefined;

  const router = useRouter();

  const brands = useBrandServer();
  const allBrands = brands?.data;

  let url = `products?page=${page}&LIMIT=${LIMIT}`;

  if (brand) {
    url += `&brand=${brand}`;
  }

  const { data, isLoading, error } = useSWR(url, fetcherPaginated, {
    revalidateIfStale: false,
    onError: (err) => console.error("SWR error", err),
    onSuccess: (data) => console.log("success swr data", data),
  });

  const { data: nextPage } = useSWR(url, fetcherPaginated, {
    revalidateIfStale: false,
    onError: (err) => console.error("SWR error", err),
    onSuccess: (data) => console.log("success swr data", data),
  });

  const context = use(UserContext);

  if (!context) return null;

  const { user } = context;

  if (!user) return null;

  const userLogin = user?.login;

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
