"use client";

import { useState } from "react";
import styles from "./EntryAnswer.module.scss";

const EntryAnswer = ({ answer }: { answer: string }) => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
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

export default EntryAnswer;
