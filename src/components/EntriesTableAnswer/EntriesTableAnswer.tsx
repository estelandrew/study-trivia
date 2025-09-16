"use client";

import { useState } from "react";
//import { useUserLearnedEntriesContext } from "@/context/UserLearnedEntriesContext";
import { Props } from "./EntriesTableAnswer.types";
import styles from "./EntriesTableAnswer.module.scss";

const EntriesTableAnswer = ({ answer }: Props) => {
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

export default EntriesTableAnswer;
