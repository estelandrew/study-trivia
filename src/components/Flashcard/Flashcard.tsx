import styles from "./Flashcard.module.scss";

const Flashcard = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.edge} history`}></div>
      <div className={styles.mainArea}>
        <div className={styles.breadcrumbs}>
          <a href="#">History</a>&nbsp;&gt;&nbsp;
          <a href="#">Presidents</a>
        </div>
        <div className={styles.mainText}>
          16th President of the United States
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
