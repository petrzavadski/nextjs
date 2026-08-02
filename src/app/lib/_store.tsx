import { useState } from "react";

export const useStore = () => {
  const [myBrand, setMyBrand] = useState("");

  return { myBrand, setMyBrand };
};
