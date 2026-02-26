// "use client";
// import { useParams } from "next/navigation";
import { FC } from "react";
import { Racket } from "@/app/components/racket/racket";
import { Metadata } from "next";
import { getMetaRacketById } from "@/app/services/getMetaRacketById";

export async function generateMetadata({
  params,
}: PageProps<"/racket/[id]">): Promise<Metadata> {
  const { id } = await params;
  const { isError, data } = await getMetaRacketById(id);

  if (isError || !data)
    return {
      title: "default title",
      description: "default description",
    };

  return {
    title: data.name,
    description: data.description,
  };
}

const Page: FC<{
  params: Promise<{ id: string }>;
}> = async ({ params }) => {
  const { id } = await params;

  return <Racket id={id} />;
};

export default Page;
