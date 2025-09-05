import { useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { FaRegSquare } from "react-icons/fa6";
import EntriesTableAnswer from "@components/EntriesTableAnswer/EntriesTableAnswer";
import { Props } from "./EntriesTableRow.types";
import styles from "./EntriesTableRow.module.scss";

const EntriesTableRow = ({ clue, answer }: Props) => {
  const [isLearned, setIsLearned] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const toggleIsLearned = () => {
    setIsLearned(!isLearned);
  };

  useEffect(() => {
    if (isLearned) {
      setIsRevealed(true);
    }
  }, [isLearned]);

  return (
    <tr>
      <td>{clue}</td>
      <EntriesTableAnswer
        answer={answer}
        isRevealedState={[isRevealed, setIsRevealed]}
      />
      <td className={styles.learnedCell} onClick={toggleIsLearned}>
        {isLearned ? (
          <div className={styles.isLearnedCheck}>
            <FiCheck />
          </div>
        ) : (
          <div className={styles.notLearnedCheck}>
            <FaRegSquare />
          </div>
        )}
      </td>
    </tr>
  );
};

export default EntriesTableRow;
