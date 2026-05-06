"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext, // Изменено: используем useContext вместо use
  useEffect,
  useState,
} from "react";
import { IRacket } from "../types/racket";

// Исправлен тип - убираем вложенность
type SetFavoriteType = {
  id: IRacket["id"];
  isFavorite?: boolean;
};

type FavoriteContextType = {
  favorites: Record<IRacket["id"], boolean>;
  setFavorite: (params: SetFavoriteType) => void;
};

// Добавляем значение по умолчанию
export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: {},
  setFavorite: () => {},
});

export const FavoriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState<Record<IRacket["id"], boolean>>(
    {},
  );

  const setFavorite = ({ id, isFavorite }: SetFavoriteType) => {
    setFavorites((prev) => {
      if (prev[id] === isFavorite) return prev;

      return {
        ...prev,
        [id]: isFavorite ?? false,
      };
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// Исправлен хук для хидратации
export const useHydrateFavorite = ({ id, isFavorite }: SetFavoriteType) => {
  const setFavorite = useSetIsFavorite();

  useEffect(() => {
    if (typeof isFavorite === "boolean") {
      setFavorite({
        id,
        isFavorite,
      });
    }
  }, [id, isFavorite, setFavorite]);
};

// Исправлен хук для получения функции установки
export const useSetIsFavorite = () => {
  const { setFavorite } = useContext(FavoriteContext);
  return setFavorite;
};

// Исправлен хук для получения значения isFavorite
export const useIsFavoriteById = ({
  id,
  isFavoriteInitial,
}: {
  id: IRacket["id"];
  isFavoriteInitial?: boolean;
}) => {
  const { favorites } = useContext(FavoriteContext);
  const isFavoriteGlobal = favorites[id];
  const isFavorite = isFavoriteGlobal ?? isFavoriteInitial ?? false;
  return isFavorite;
};
