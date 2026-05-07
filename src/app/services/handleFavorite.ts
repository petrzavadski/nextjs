"use server";
import { BASE_CLIENT_URL } from "@/app/constants/service";
import { BASE_API_URL } from "@/app/constants/service";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type Props = {
  racketId: string;
  isFavorite: boolean;
};

export const handleFavorite = async ({ isFavorite, racketId }: Props) => {
  const url = `${BASE_API_URL}product/${racketId}/favorite`;
  const cookieStore = await cookies();

  const response = await fetch(url, {
    credentials: "include",
    headers: { Cookie: cookieStore.toString() },
    method: isFavorite ? "DELETE" : "POST",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to ${isFavorite ? "remove from" : "add to"} favorites`,
    );
  }

  revalidatePath(`${BASE_CLIENT_URL}${racketId}`);
  revalidatePath("/");

  return { isError: false, data: { isFavorite } };
};
