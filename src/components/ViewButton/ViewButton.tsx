import { useState, useEffect } from "react";
import { FaListCheck, FaUserGraduate } from "react-icons/fa6";
import { RiSpyFill } from "react-icons/ri";
import { Views } from "@/types/types";
import { useEntriesTableContext } from "@/context/EntriesTableContext/EntriesTableContext";
import styles from "./ViewButton.module.scss";

const ViewButton = ({
  view,
  label,
  count,
}: {
  view: Views;
  label: string;
  count?: number;
}) => {
  const { currentView, setCurrentView } = useEntriesTableContext();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (currentView === view) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [currentView, view]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget as HTMLElement;
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

  const Icon = () => {
    if (view === Views.Remaining) {
      return <FaListCheck />;
    } else if (label === "Cheat Sheet") {
      return <RiSpyFill />;
    } else {
      return <FaUserGraduate />;
    }
  };

  return (
    <button
      className={`${styles.container} ${isActive ? styles.active : styles.notActive}`}
      id={view}
      onClick={handleButtonClick}
    >
      <div className={styles.flexContainer}>
        <div>
          <Icon />
        </div>
        <div className={styles.label}>{label}</div>
        {count && <div>({count})</div>}
      </div>
    </button>
  );
};

export default ViewButton;
