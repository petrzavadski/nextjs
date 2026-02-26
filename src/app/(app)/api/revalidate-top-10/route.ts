import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidateTag("getTop10Rackets", "max");

  return NextResponse.json({ text: "success" });
}
