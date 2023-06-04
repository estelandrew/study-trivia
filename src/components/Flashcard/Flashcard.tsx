import styles from "./Flashcard.module.scss";

const Flashcard = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.edge} history`}></div>
      <div className={styles.mainArea}>
        <div className={styles.breadcrumbs}>History &gt; Presidents</div>
        <div className={styles.mainText}>
          16th President of the United States
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
