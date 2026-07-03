import { useState } from "react";

export const Store = () => {
  const [myBrand, setMyBrand] = useState("");

  return { myBrand, setMyBrand };
};
