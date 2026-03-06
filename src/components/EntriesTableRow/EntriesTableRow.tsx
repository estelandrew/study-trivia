import { useState, useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import { FaRegSquare } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";
import { useEntriesTableContext } from "@/context/EntriesTableContext/EntriesTableContext";
import { Views } from "@/types/types";
import { Props } from "./EntriesTableRow.types";
import styles from "./EntriesTableRow.module.scss";

const EntriesTableRow = ({ clue, answer, entryId }: Props) => {
  const { currentView } = useEntriesTableContext();
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const showAnswer = useMemo(() => {
    let result: boolean;
    if (
      currentView === Views.Learned ||
      currentView === Views.Sheet ||
      isRevealed
    ) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [currentView, isRevealed]);

  const toggleRevealed = () => {
    if (currentView !== Views.Remaining) return -1;
    setIsRevealed(!isRevealed);
  };

  return (
    <AnimatePresence>
      <motion.tr
        key={entryId}
        layout
        initial={{ opacity: 0, scaleY: 0.8 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.2 }}
        style={{ transformOrigin: "top" }}
      >
        <td>{clue}</td>
        <td
          className={`${styles.answerContainer} ${currentView !== Views.Remaining ? `${styles.defaultCursor}` : ``}`}
          onClick={toggleRevealed}
        >
          {showAnswer ? (
            <div className={styles.answer}>{answer}</div>
          ) : (
            <div className={styles.concealer}>Reveal answer</div>
          )}
        </td>

        {currentView !== Views.Sheet && (
          <td className={styles.learnedCell}>
            <div className={styles.isLearnedCheck}>
              {currentView === Views.Remaining ? <FaRegSquare /> : <FiCheck />}
            </div>
          </td>
        )}
      </motion.tr>
    </AnimatePresence>
  );
};

export default EntriesTableRow;
