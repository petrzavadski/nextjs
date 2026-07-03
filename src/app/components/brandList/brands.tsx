"use client";

import { Store } from "@/app/lib/store";
import { BrandsResponse } from "@/app/types/brands";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { LIMIT } from "@/app/constants/service";
import { useEffect } from "react";

export const Brands = ({ brands }: { brands: BrandsResponse | undefined }) => {
  const { myBrand, setMyBrand } = Store();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBrand = searchParams?.get("brand") || "";

  useEffect(() => {
    setMyBrand(currentBrand);
  }, [currentBrand, setMyBrand]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = e.target.value;
    setMyBrand(selectedBrand);

    const params = new URLSearchParams(searchParams.toString());

    if (selectedBrand && selectedBrand !== "-- Выберите бренд --") {
      params.set("brand", selectedBrand.toString());
    } else {
      params.delete("brand");
    }

    params.set("limit", LIMIT.toString());

    params.set("page", "1");

    router.push(`?${params}`.toString());
  };

  return (
    <form>
      <span>Фильтрация по бренду:</span>

      <select value={myBrand} onChange={handleSelectChange}>
        <option value="-- Выберите бренд --">-- Выберите бренд --</option>
        {brands?.map((brand: { id: string; name: string }) => {
          return (
            <option key={brand.id} value={brand.name}>
              {brand.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};
