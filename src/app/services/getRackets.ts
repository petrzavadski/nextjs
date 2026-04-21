import { IRacket } from "../types/racket";
import { Response } from "../types/request";
import { BASE_API_URL } from "../constants/service";

type Params = {
  page?: number;
  limit?: number;
};

// export const getRackets = async ({
//   page = 1,
//   limit = 10,
// }: Params = {}): Promise<Response<IRacket[]>> => {
//   // Используем правильный URL с /api/
//   const url = `${BASE_API_URL}products?page=${page}&limit=${limit}`;

//   console.log("🔵 Fetching from:", url);
//   console.log("🔵 BASE_API_URL:", BASE_API_URL);

//   try {
//     const response = await fetch(url, {
//       // Добавляем заголовки как в рабочем примере
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // Для серверных компонентов Next.js
//       cache: "no-store",
//     });

//     console.log("🔵 Response status:", response.status);
//     console.log("🔵 Response statusText:", response.statusText);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("🔴 Error response body:", errorText);

//       console.error("🔴 HTTP error:", response.status);
//       return { isError: true, data: undefined };
//     }

//     // Просто возвращаем JSON как есть (как в рабочем примере)
//     const data = await response.json();
//     console.log("🔵 Data received:", data);

//     return {
//       isError: false,
//       data: Array.isArray(data) ? data : data.products || data,
//     };
//   } catch (error) {
//     console.error("🔴 Fetch error:", error);
//     return { isError: true, data: undefined };
//   }
// };

// Мок данные для тестирования
const mockRackets: IRacket[] = [
  {
    id: "1",
    model: "dfdfdf",
    year: 1999,
    name: "Wilson Blade 98",
    price: 249,
    description: "Professional tennis racket with excellent control",
    imageUrl: "/images/rackets/wilson-blade.jpg",
  },
  {
    id: "2",
    model: "dfdfdf",
    year: 1999,
    name: "Babolat Pure Drive",
    price: 229,
    description: "Power and spin friendly racket",
    imageUrl: "/images/rackets/babolat-pure-drive.jpg",
  },
  {
    id: "3",
    model: "dfdfdf",
    year: 1999,
    name: "Head Speed Pro",
    price: 269,
    description: "For aggressive baseline players",
    imageUrl: "/images/rackets/head-speed.jpg",
  },
  {
    id: "4",
    model: "dfdfdf",
    year: 1999,
    name: "Yonex Ezone 98",
    price: 259,
    description: "Precision and feel for advanced players",
    imageUrl: "/images/rackets/yonex-ezone.jpg",
  },
  {
    id: "5",
    model: "dfdfdf",
    year: 1999,
    name: "Prince Textreme Tour",
    price: 219,
    description: "Great combination of power and control",
    imageUrl: "/images/rackets/prince-tour.jpg",
  },
];

export const getRackets = async ({
  page = 1,
  limit = 10,
}: Params = {}): Promise<Response<IRacket[]>> => {
  // Используем мок данные вместо API запроса
  // Имитируем задержку сети для реалистичности
  await new Promise((resolve) => setTimeout(resolve, 500));

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = mockRackets.slice(start, end);

  //console.log("📦 Returning mock data:", paginatedData);

  return {
    isError: false,
    data: paginatedData,
  };
};
