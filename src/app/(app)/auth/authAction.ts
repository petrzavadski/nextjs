"use server";

import { BASE_API_URL } from "@/app/constants/service";
import { parseSetCookie } from "@/app/(app)/helpers/parse-set-cookie";
import { cookies } from "next/headers";

type LoginActionState = {
  error: string;
} | null;

export const loginAction = async (
  state: LoginActionState,
  formData: FormData,
) => {
  const login = formData.get("login")?.toString() ?? "";

  const password = formData.get("password1")?.toString() ?? "";

  const result = await fetch(`${BASE_API_URL}auth/signup`, {
    method: "POST",
    body: JSON.stringify({ login, password }),
    headers: { "Content-type": "application/json" },
  });

  if (result.status !== 200) {
    return { error: "Error occured", redirectTo: undefined };
  }

  const cookiesStore = await cookies();
  const setCookieHeaders = result.headers.getSetCookie();

  if (setCookieHeaders && setCookieHeaders.length > 0) {
    const parsedCookies = parseSetCookie(setCookieHeaders);

    for (const cookie of parsedCookies) {
      cookiesStore.set(cookie.name, cookie.value, {
        domain: cookie.domain,
        expires: cookie.expires,
        httpOnly: cookie.httpOnly,
        maxAge: cookie.maxAge,
        path: cookie.path,
        sameSite: cookie.sameSite,
        secure: cookie.secure,
      });
    }
  }
  return { error: "", redirectTo: "/" };
};
