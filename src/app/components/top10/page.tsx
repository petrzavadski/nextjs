import { RacketMini } from "@/app/components/racketMini/racket";
import { Selection } from "@@/selection/selection";
import { getTop10rackets } from "@/app/services/getTop10rackets";
import { Suspense } from "react";
import { notFound } from "next/navigation";

const Top10 = async () => {
  const { isError, data } = await getTop10rackets();

  if (isError) return "Error";

  if (!data) return notFound();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Selection>
        {data.map((racket) => (
          <RacketMini key={racket.id} id={racket.id} />
        ))}
      </Selection>
    </Suspense>
  );
};

export default Top10;
