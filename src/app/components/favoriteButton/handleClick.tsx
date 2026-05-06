"use server";
import { cookies } from "next/headers";
import { BASE_API_URL } from "@/app/constants/service";
import { revalidatePath } from "next/cache";

type Props = {
  racketId: string;
  isFavorite: boolean;
};

export const handleFavorite = async ({ racketId, isFavorite }: Props) => {
  const url = `${BASE_API_URL}/product/${racketId}/favorite`;
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  console.log("=== FAVORITE ACTION ===");
  console.log("racketId:", racketId);
  console.log("isFavorite:", isFavorite);
  console.log("method:", isFavorite ? "DELETE" : "POST");
  console.log("Cookies string:", cookieString);
  console.log("Full URL:", url);

  try {
    const response = await fetch(url, {
      method: isFavorite ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
      credentials: "include",
    });

    console.log("Response status:", response.status);
    console.log("Response statusText:", response.statusText);

    const text = await response.text();
    console.log("Response body:", text);

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
