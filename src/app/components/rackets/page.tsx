import { RacketMini } from "@/app/components/racketMini/racket";
import { Selection } from "@@/selection/selection";
import { getRackets } from "@/app/services/getRackets";
import { Suspense } from "react";
import { notFound } from "next/navigation";

const Rackets = async () => {
  const { isError, data } = await getRackets({ page: 1, limit: 10 });

  if (isError) return "Error";

  if (!data) return notFound();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Selection>
        {data.map((racket) => {
          return <RacketMini key={racket.id} id={racket.id} />;
        })}
      </Selection>
    </Suspense>
  );
};

export default Rackets;
