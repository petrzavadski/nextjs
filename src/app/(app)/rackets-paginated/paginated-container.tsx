import { RacketMiniClient } from "@/app/components/racketMiniClient/racket";
import { Selection } from "@/app/components/selection/selection";

type RacketMiniData = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  userData?: {
    isFavorite: boolean;
  };
};

type Data = RacketMiniData[];

export const PaginatedPage = ({
  data,
  userLogin,
}: {
  data: Data;
  userLogin?: string;
}) => {
  return (
    <Selection>
      {data.map((racket: RacketMiniData) => {
        return (
          <RacketMiniClient
            key={racket.id}
            racket={racket}
            userLogin={userLogin}
          />
        );
      })}
    </Selection>
  );
};
