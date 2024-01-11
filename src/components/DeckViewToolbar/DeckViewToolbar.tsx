import { ReactNode } from "react";
import styles from "./DeckViewToolbar.module.scss";
import ButtonWithDropdown from "@components/ButtonWithDropdown/ButtonWithDropdown";
import { FaFilter } from "react-icons/fa";
import { FilterDeckButton } from "@components/FilterDeckButton/FilterDeckButton";

const DeckViewToolbar = () => {
  const Icon = FaFilter;

  return (
    <div className={styles.toolbar}>
      <FilterDeckButton />
    </div>
  );
};

export default DeckViewToolbar;
