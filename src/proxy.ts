import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./app/services/getUser";

export async function proxy(request: NextRequest) {
  const { data } = await getUser();

  if (!data?.isAdmin && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.json(
      { message: "forbidden", status: 403 },
      {
        status: 403,
      },
    );
  }

  if (
    request.nextUrl.pathname.startsWith("403") &&
    request.headers.get("x-middleware")
  ) {
    return NextResponse.json(
      { status: 404 },
      {
        status: 404,
      },
    );
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
