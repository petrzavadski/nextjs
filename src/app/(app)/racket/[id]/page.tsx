// "use client";
// import { useParams } from "next/navigation";
import { FC } from "react";
import { Racket } from "@/app/components/racket/racket";

// export const generateStaticParams = () => {
//   return [{ id: ["1"] }, { id: ["2"] }, { id: ["3"] }];
// };

const Page: FC<{
  params: Promise<{ id: string }>;
}> = async ({ params }) => {
  const { id } = await params;

  // const response = await fetch(`http://localhost:4000/api/product/${id}`);
  // const pureData = await response.json();
  // const data = pureData.product;
  return <Racket id={id} />;
};

export default Page;
