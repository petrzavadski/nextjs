// Based on https://github.com/nfriedly/set-cookie-parser (MIT)
// Copyright (c) 2015 Nathan Friedly <nathan@nfriedly.com> (http://nfriedly.com/)
// Last sync: v2.6.0 830debeeeec2ee21a36256bdef66485879dd18cd

import type { SetCookie, SetCookieParseOptions } from "./types";

/**
 * Parse one or more [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) header strings into an array of objects.
 */
export function parseSetCookie(
  setCookieValue: string | string[],
  options?: SetCookieParseOptions,
): SetCookie[] {
  // Если передана строка, превращаем её в массив
  const headers = Array.isArray(setCookieValue)
    ? setCookieValue
    : [setCookieValue];

  // Парсим каждый заголовок и фильтруем возможные undefined
  return headers
    .filter((header) => typeof header === "string" && header.trim() !== "")
    .map((header) => parseSingleSetCookie(header, options))
    .filter((cookie): cookie is SetCookie => cookie !== null);
}

/**
 * Parse a single Set-Cookie header string into an object.
 */
function parseSingleSetCookie(
  setCookieValue: string,
  options?: SetCookieParseOptions,
): SetCookie | null {
  try {
    const parts = (setCookieValue || "")
      .split(";")
      .filter((str) => typeof str === "string" && !!str.trim());

    if (parts.length === 0) {
      return null;
    }

    const nameValuePairStr = parts.shift() || "";
    const parsed = parseNameValuePair(nameValuePairStr);

    const name = parsed.name;
    if (!name) {
      return null;
    }

    let value = parsed.value;
    try {
      value =
        options?.decode === false
          ? value
          : (options?.decode || decodeURIComponent)(value);
    } catch {
      // Fallback to undecoded value
    }

    const cookie: SetCookie = {
      name: name,
      value: value,
    };

    for (const part of parts) {
      const sides = part.split("=");
      const partKey = (sides.shift() || "").trimStart().toLowerCase();
      const partValue = sides.join("=");

      switch (partKey) {
        case "expires": {
          cookie.expires = new Date(partValue);
          break;
        }
        case "max-age": {
          cookie.maxAge = Number.parseInt(partValue, 10);
          break;
        }
        case "domain": {
          cookie.domain = partValue;
          break;
        }
        case "path": {
          cookie.path = partValue;
          break;
        }
        case "secure": {
          cookie.secure = true;
          break;
        }
        case "httponly": {
          cookie.httpOnly = true;
          break;
        }
        case "samesite": {
          cookie.sameSite = partValue as SetCookie["sameSite"];
          break;
        }
        default: {
          // Игнорируем неизвестные атрибуты
          break;
        }
      }
    }

    return cookie;
  } catch {
    // В случае ошибки парсинга возвращаем null
    return null;
  }
}

/** Parses name-value-pair according to rfc6265bis draft */
function parseNameValuePair(nameValuePairStr: string): {
  name: string;
  value: string;
} {
  let name = "";
  let value = "";
  const nameValueArr = nameValuePairStr.split("=");

  if (nameValueArr.length > 1) {
    name = nameValueArr.shift()!.trim();
    // Everything after the first =, joined by a "=" if there was more than one part
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }

  return { name, value };
}

// Для обратной совместимости оставляем функцию, которая парсит одну строку
export function parseSingleCookie(
  setCookieValue: string,
  options?: SetCookieParseOptions,
): SetCookie | null {
  return parseSingleSetCookie(setCookieValue, options);
}
