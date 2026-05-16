import { IRacket } from "../types/racket";
import { Response } from "../types/request";
import { BASE_API_URL } from "../constants/service";

export const getTop10rackets = async (): Promise<Response<IRacket[]>> => {
  const url = `${BASE_API_URL}top-10`;

  console.log("🔵 Fetching from:", url);

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },

      next: {
        tags: ["getTop10Rackets"],
      },
    });

    console.log("🔵 Response status:", response.status);

    if (!response.ok) {
      console.error("🔴 HTTP error:", response.status);
      return { isError: true, data: undefined };
    }

    const data = await response.json();

    return {
      isError: false,
      data: Array.isArray(data) ? data : data.products || data,
    };
  } catch (error) {
    console.error("🔴 Fetch error:", error);
    return { isError: true, data: undefined };
  }
};
