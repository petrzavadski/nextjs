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

  const password1 = formData.get("password1")?.toString() ?? "";
  const password2 = formData.get("password2")?.toString() ?? "";

  if (password1 !== password2)
    return { error: "Пароли не совпадают", redirectTo: undefined };
  if (password1.length < 6)
    return { error: "Пароль меньше 6 символов", redirectTo: undefined };

  const result = await fetch(`${BASE_API_URL}auth/signup`, {
    method: "POST",
    body: JSON.stringify({ login, password: password1 }),
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
