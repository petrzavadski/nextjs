import { IRacket } from "../types/racket";
import { Response } from "../types/request";
import { BASE_API_URL } from "@/app/constants/service";

type Params = {
  page?: number;
  limit?: number;
  brand?: string;
};

export const getRackets = async ({
  page = 1,
  limit = 10,
  brand = undefined,
}: Params = {}): Promise<Response<IRacket[]>> => {
  let url;

  if (typeof brand === "string") {
    url = `${BASE_API_URL}products?page=${page}&limit=${limit}&brand=${brand}`;
  } else {
    url = `${BASE_API_URL}products?page=${page}&limit=${limit}`;
  }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },

    next: {
      tags: ["getRackets"],
    },
  });

  if (!response.ok) {
    console.error("🔴 HTTP error:", response.status);
    return { isError: true, data: undefined };
  }

  const data = await response.json();

  try {
    return {
      isError: false,
      data: data,
    };
  } catch (error) {
    console.error("🔴 Fetch error:", error);
    return { isError: true, data: undefined };
  }
};
