"use server";
import { cookies } from "next/headers";
import { BASE_API_URL } from "@/app/constants/service";
import { revalidatePath } from "next/cache";

type Props = {
  racketId: string;
  isFavorite: boolean;
};

export const handleFavorite = async ({ racketId, isFavorite }: Props) => {
  const url = `${BASE_API_URL}product/${racketId}/favorite`;
  const cookieStore = await cookies();

  try {
    const response = await fetch(url, {
      credentials: "include",
      cache: "no-store", // отключаем кэш
      method: isFavorite ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    const text = await response.text();

    let data = {};
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { error: e };
    }

    revalidatePath(`/racket/${racketId}`);
    revalidatePath("/");

    return {
      ok: response.ok,
      status: response.status,
      message: response.ok ? "Success" : "Failed",
      isFavorite,
      data,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      ok: false,
      status: 500,
      message: "Failed",
      isFavorite,
      error: String(error),
    };
  }
};

export const revaliator = async (id: string) => {
  revalidatePath(`/racket/${id}`);
  revalidatePath("/");
};
