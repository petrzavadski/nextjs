// "use client";
// import { useParams } from "next/navigation";
import { FC } from "react";

export const generateStaticParams = () => {
  return [{ id: ["1"] }, { id: ["2"] }, { id: ["3"] }];
};

const Page: FC<PageProps<"/racket/[...id]">> = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(`http://localhost:4000/api/product/${id}`);
  const pureData = await response.json();
  const data = pureData.product;
  return (
    <div>
      <div>ID page {id.join(" ")}</div>
      <div>Наименование: {data.name}</div>
      <div>Цена: {data.price}</div>
      <div>Модель: {data.model}</div>
      <div>Год выпуска: {data.year}</div>
      <div>Описание: {data.description}</div>
    </div>
  );
};

// const Page: FC<PageProps<"/racket/[id]">> = () => {
//   const { id } = useParams<{ id: string }>();
//   return <div>ID page {id}</div>;
// };

export default Page;
