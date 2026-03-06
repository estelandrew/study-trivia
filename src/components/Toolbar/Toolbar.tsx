import { useEntriesTableContext } from "@/context/EntriesTableContext/EntriesTableContext";
import { Views } from "@/types/types";
import { Props } from "./Toolbar.types";
import styles from "./Toolbar.module.scss";

const Toolbar = ({ collectionJoinEntries }: Props) => {
  const { setCurrentView } = useEntriesTableContext();
  const { count } = collectionJoinEntries.entries_count[0];

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.target as HTMLElement;
    switch (el.id) {
      case Views.Remaining:
      case Views.Learned:
      case Views.Sheet:
        setCurrentView(el.id);
        break;
      default:
        console.error("Btn id must be from Views enum");
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div>{count} items</div>
      <button id={Views.Remaining} onClick={handleButtonClick}>
        Remaining
      </button>
      <button id={Views.Learned} onClick={handleButtonClick}>
        Learned
      </button>
      <button id={Views.Sheet} onClick={handleButtonClick}>
        Study sheet
      </button>
    </div>
  );
};

export default Toolbar;
