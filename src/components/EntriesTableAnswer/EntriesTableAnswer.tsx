"use client";

import { useEntriesTable } from "@/context/EntriesTableContext/EntriesTableContext";
import { Views } from "@/types/types";
import { Props } from "./EntriesTableAnswer.types";
import styles from "./EntriesTableAnswer.module.scss";

const EntriesTableAnswer = ({ answer, isRevealedState }: Props) => {
  const { state } = useEntriesTable();
  const [isRevealed, setIsRevealed] = isRevealedState;
  const toggleRevealed = () => {
    setIsRevealed(!isRevealed);
  };
  return (
    <>
      {state.currentView === Views.Sheet ? (
        <td className={`${styles.container} ${styles.study}`}>{answer}</td>
      ) : (
        <td className={styles.container} onClick={toggleRevealed}>
          {isRevealed ? (
            <div className={styles.answer}>{answer}</div>
          ) : (
            <div className={styles.concealer}>Reveal answer</div>
          )}
        </td>
      )}
    </>
  );
};

export default EntriesTableAnswer;
