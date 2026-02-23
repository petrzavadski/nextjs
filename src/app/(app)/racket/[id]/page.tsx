// "use client";
// import { useParams } from "next/navigation";
import { FC } from "react";
import { Racket } from "@/app/components/racket/racket";

const Page: FC<{
  params: Promise<{ id: string }>;
}> = async ({ params }) => {
  const { id } = await params;

  return <Racket id={id} />;
};

export default Page;
