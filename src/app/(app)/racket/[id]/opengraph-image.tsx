import { getRacketById } from "@/app/services/getRacketById";
import { IRacket } from "@/app/types/racket";
import { ImageResponse } from "next/og";

export const alt = "OG IMAGE";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const OgImage = ({ racket }: { racket: IRacket }) => {
  return (
    <div style={{ display: "flex" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={racket.imageUrl} width={1200} height={630} alt={racket.name} />

      <div>{racket.name}</div>
    </div>
  );
};

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getRacketById(id);
  if (!data) return null;

  return new ImageResponse(<OgImage racket={data} />, {
    width: 1200,
    height: 630,
  });
}
