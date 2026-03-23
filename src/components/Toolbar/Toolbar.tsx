import { Views } from "@/types/types";
import { useEntriesTableContext } from "@/context/EntriesTableContext/EntriesTableContext";
import ViewButton from "../ViewButton/ViewButton";
import styles from "./Toolbar.module.scss";

const Toolbar = () => {
  const { counts } = useEntriesTableContext();

  return (
    <div className={styles.container}>
      <div className={styles.count}>{counts.total} items</div>
      <div className={styles.flexContainer}>
        <ViewButton
          view={Views.Remaining}
          label="Remaining"
          count={counts.remaining}
        />
        <ViewButton
          view={Views.Learned}
          label="Learned"
          count={counts.learned}
        />
        <div className={styles.pushRight}>
          <ViewButton view={Views.Sheet} label="Cheat Sheet" />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
