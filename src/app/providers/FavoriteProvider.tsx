"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { IRacket } from "../types/racket";

type SetFavoriteType = {
  id: IRacket["id"];
  isFavorite?: boolean;
};

type FavoriteContextType = {
  favorites: Record<IRacket["id"], boolean>;
  setFavorite: (params: SetFavoriteType) => void;
};

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

export const useSetIsFavorite = () => {
  const { setFavorite } = useContext(FavoriteContext);
  return setFavorite;
};

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
