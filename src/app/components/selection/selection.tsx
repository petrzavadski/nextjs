// components/selection/selection.tsx
import { FC, ReactNode } from "react";
import styles from "./selection.module.css";

type SelectionProps = {
  children: ReactNode;
};

export const Selection: FC<SelectionProps> = ({ children }) => {
  return (
    <section className={styles.selection}>
      <div className={styles.grid}>{children}</div>
    </section>
  );
};
