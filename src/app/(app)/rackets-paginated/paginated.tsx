"use client";

import { fetcherPaginated } from "@/app/lib/fetcher";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { PaginatedPage } from "./paginated-container";
import { getUser } from "@/app/services/getUser";
import { LIMIT } from "../racket-infinite/constants";

export const RacketPaginatedContainer = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "") || 1;

  const { data, isLoading, error } = useSWR(
    `products?page=${page}&limit=${LIMIT}`,
    fetcherPaginated,
    {
      revalidateIfStale: false,
      onError: (err) => console.error("SWR error", err),
      onSuccess: (data) => console.log("success swr data", data),
    },
  );

  // Запрос пользователя (кешируется автоматически)
  const { data: userData } = useSWR("/api/user", getUser);

  console.log({ userData });
  const userLogin = userData?.data?.login;

  const updatePage = (page: number) => {
    window.history.pushState({}, "", `?page=${page}`);
  };

  if (error) return "some error";

  if (isLoading) return "swr loading ...";

  if (!data) return "empty";
  console.log({ data });
  return (
    <div>
      <PaginatedPage data={data} userLogin={userLogin} />

      <div>
        {page > 1 && <button onClick={() => updatePage(page - 1)}>PREV</button>}
        <div>Page #{page}</div>
        {page + 1 !== data.length && data.length <= LIMIT && (
          <button onClick={() => updatePage(page + 1)}>NEXT</button>
        )}
      </div>
    </div>
  );
};
