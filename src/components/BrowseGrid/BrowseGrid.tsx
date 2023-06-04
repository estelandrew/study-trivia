import styles from "./BrowseGrid.module.scss";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const BrowseGrid = () => {
  return (
    <div className={`${styles.container} ${rubik.className}`}>
      <div className={`${styles.card} history`}>
        <span className={styles.cardText}>History</span>
      </div>
      <div className={`${styles.card} science`}>
        <span className={styles.cardText}>Science</span>
      </div>
      <div className={`${styles.card} geography`}>
        <span className={styles.cardText}>Geography</span>
      </div>
      <div className={`${styles.card} entertainment`}>
        <span className={styles.cardText}>Entertainment</span>
      </div>
      <div className={`${styles.card} sports`}>
        <span className={styles.cardText}>Sports</span>
      </div>
      <div className={`${styles.card} artsLit`}>
        <span className={styles.cardText}>Arts & Literature</span>
      </div>
    </div>
  );
};

export default BrowseGrid;
