"use client";

import styles from "./DeckViewToolbar.module.scss";
import ButtonWithDropdown from "@components/ButtonWithDropdown/ButtonWithDropdown";
import { FaFilter } from "react-icons/fa";
import { FilterDeckButton } from "@components/FilterDeckButton/FilterDeckButton";
import { DeckDataType } from "@root/types";

// type PropsType = {
//   cards: DeckDataType;
// };

const DeckViewToolbar = () => {
  const Icon = FaFilter;

  return (
    <div className={styles.toolbar}>
      <FilterDeckButton />
    </div>
  );
};

export default DeckViewToolbar;
