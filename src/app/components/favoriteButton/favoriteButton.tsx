"use client";

import { use } from "react";
import { UserContext } from "@/app/providers/UserProvider";
import styles from "./favoriteButton.module.css";
import { FC } from "react";

type Props = {
  userLogin?: string;
  rackeId: number;
  isFavorite: boolean;
};

const handleFavorite = async ({isFavorite: racketId}: Props) =>{
  const url = `{BASE_API_URL}/product/${racketId}/favorite`;

  return fetch(url, {
    credentials: "include",
    method: isFavorite ? "DELETE" : "POST"
  })
}

export const FavoriteButton: FC<Props> = ({ userLogin, rackeId, isFavorite :isFavoriteInitial}: Props) => {
  const context = use(UserContext);
  const user = context?.user;

  // Показываем кнопку только если пользователь авторизован
  if (!user || !userLogin) return null;

  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const [isPendind, startTransition] = useTransition();

   const handleClick = useCallback(async ({rackeId, isFavorite}: Props)=>{

 startTransition(async()=>{
    await handleFavorite({rackeId, isFavorite});
    setIsFavorite(!isFavorite)
  })

  }, []);
  return (
    <button disabled={isPendind} onClick={()=>handleClick({rackeId, isFavorite})} className={styles.bookmarkButton}>{isFavorite? "Удалить из избранного" : "Добавить в избранное"}</button>
  );
};
 