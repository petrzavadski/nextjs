import { IRacket } from "../types/racket";
import { Response } from "../types/request";
import { BASE_API_URL } from "../constants/service";

export const getTop10rackets = async (): Promise<Response<IRacket[]>> => {
  // Используем правильный URL с /api/
  const url = `${BASE_API_URL}top-10`;

  console.log("🔵 Fetching from:", url);

  try {
    const response = await fetch(url, {
      // Добавляем заголовки как в рабочем примере
      headers: {
        "Content-Type": "application/json",
      },
      // Для серверных компонентов Next.js
      cache: "no-store",
    });

    console.log("🔵 Response status:", response.status);

    if (!response.ok) {
      console.error("🔴 HTTP error:", response.status);
      return { isError: true, data: undefined };
    }

    // Просто возвращаем JSON как есть (как в рабочем примере)
    const data = await response.json();
    console.log("🔵 Data received:", data);

    // В рабочем примере data - это уже массив?
    // Если API возвращает { products: [...] } или что-то подобное, адаптируйте:

    return {
      isError: false,
      data: Array.isArray(data) ? data : data.products || data,
    };
  } catch (error) {
    console.error("🔴 Fetch error:", error);
    return { isError: true, data: undefined };
  }
};
