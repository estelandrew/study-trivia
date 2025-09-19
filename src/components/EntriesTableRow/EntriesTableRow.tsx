import { useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { FaRegSquare } from "react-icons/fa6";
import { useLearnedEntriesContext } from "@/context/LearnedEntriesContext";
import EntriesTableAnswer from "@components/EntriesTableAnswer/EntriesTableAnswer";
import { Props } from "./EntriesTableRow.types";
import styles from "./EntriesTableRow.module.scss";

const EntriesTableRow = ({ clue, answer, collectionId, entryId }: Props) => {
  const { learnedEntries } = useLearnedEntriesContext();
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

  useEffect(() => {
    if (learnedEntries?.length) {
      const matchingEntry = learnedEntries.filter(
        (x) => x["collection_id"] === collectionId && x["entry_id"] === entryId
      )[0];
      if (matchingEntry) setIsLearned(true);
    }
  }, [learnedEntries, collectionId, entryId]);

  return (
    <tr>
      <td>{clue}</td>
      <EntriesTableAnswer
        answer={answer}
        isRevealedState={[isRevealed, setIsRevealed]}
        collectionId={collectionId}
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
