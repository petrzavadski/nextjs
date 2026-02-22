import Rackets from "./components/rackets/page";
import Top10 from "./components/top10/page";
import styles from "./page.module.css";

const Page = () => {
  return (
    <div>
      <div className={styles.text}>10 ракеток</div>
      <Rackets />
      <div className={styles.text}>Топ 10</div>
      <Top10 />
    </div>
  );
};

export default Page;
