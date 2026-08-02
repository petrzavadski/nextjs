"use client";

import { useSearchParams } from "next/navigation";
import { Brand } from "@/app/types/brands";

type Props = {
  brands: Brand[] | undefined;
  updateBrand: (newBrandId: string) => void;
};

export const Brands = ({ brands, updateBrand }: Props) => {
  const searchParams = useSearchParams();

  const currentBrand = searchParams?.get("brand") || "";

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = e.target.value;
    updateBrand(selectedBrand);
  };

  if (!brands) return null;

  return (
    <form>
      <span>Фильтрация по бренду:</span>

      <select value={currentBrand} onChange={handleSelectChange}>
        {brands?.map((brand) => {
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
