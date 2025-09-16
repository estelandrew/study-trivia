"use client";

import { Props } from "./EntriesTableAnswer.types";
import styles from "./EntriesTableAnswer.module.scss";

const EntriesTableAnswer = ({ answer, isRevealedState }: Props) => {
  const [isRevealed, setIsRevealed] = isRevealedState;
  const toggleRevealed = () => {
    setIsRevealed(!isRevealed);
  };
  return (
    <td className={styles.container} onClick={toggleRevealed}>
      {isRevealed ? (
        <div className={styles.answer}>{answer}</div>
      ) : (
        <div className={styles.concealer}>Reveal answer</div>
      )}
    </td>
  );
};

export default EntriesTableAnswer;
