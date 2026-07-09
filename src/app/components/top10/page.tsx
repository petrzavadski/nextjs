import { RacketMini } from "@/app/components/racketMini/racket";
import { Selection } from "@@/selection/selection";
import { getTop10rackets } from "@/app/services/getTop10rackets";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getUser } from "@/app/services/getUser";

const Top10 = async () => {
  const { isError, data } = await getTop10rackets();

  if (isError) return "Error";

  if (!data) return notFound();
  const { data: userData } = await getUser();

  const userLogin = userData?.login;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Selection>
        {data.map((racket) => (
          <RacketMini key={racket.id} racket={racket} userLogin={userLogin} />
        ))}
      </Selection>
    </Suspense>
  );
};

export default Top10;
