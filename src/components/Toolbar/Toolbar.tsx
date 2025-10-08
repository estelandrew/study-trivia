import { useEntriesTable } from "@/context/EntriesTableContext/EntriesTableContext";
import { useLearnedEntriesContext } from "@/context/LearnedEntriesContext";
import { Views } from "@/types/types";
import { Props } from "./Toolbar.types";
import styles from "./Toolbar.module.scss";

const Toolbar = ({ collectionJoinEntries }: Props) => {
  const { dispatch } = useEntriesTable();
  const { learnedEntries } = useLearnedEntriesContext();
  const { count } = collectionJoinEntries.entries_count[0];

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.target as HTMLElement;
    switch (el.id) {
      case "btn-remaining":
        dispatch({
          type: Views.Remaining,
          payload: {
            collectionJoinEntries,
            learnedEntries,
          },
        });
        break;
      case "btn-learned":
        dispatch({
          type: Views.Learned,
          payload: {
            collectionJoinEntries,
            learnedEntries,
          },
        });
        break;
      case "btn-sheet":
        dispatch({
          type: Views.Sheet,
          payload: {
            collectionJoinEntries,
            learnedEntries,
          },
        });
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div>{count} items</div>
      <button id="btn-remaining" onClick={handleButtonClick}>
        Remaining
      </button>
      <button id="btn-learned" onClick={handleButtonClick}>
        Learned
      </button>
      <button id="btn-sheet" onClick={handleButtonClick}>
        Study sheet
      </button>
    </div>
  );
};

export default Toolbar;
