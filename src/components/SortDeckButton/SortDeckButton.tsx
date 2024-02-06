import { useContext } from "react";
import ButtonWithDropdown from "@components/ButtonWithDropdown/ButtonWithDropdown";
import { FaSort } from "react-icons/fa6";
import { useState } from "react";
import styles from "./SortDeckButton.module.scss";
import { CardsContext } from "@root/src/hooks/useCardsContext";
import { DeckviewToolbarContext } from "@components/DeckViewToolbar/DeckViewToolbar";
import Button from "@components/Button/Button";

export const SortDeckButton = () => {
  const { sortCards, toolbarStatus, setToolbarStatus } =
    useContext(CardsContext);
  const { toggleDropdown } = useContext(DeckviewToolbarContext);

  const onClickApply = (e: React.MouseEvent) => {
    const checkedInput = document.querySelector(
      'input[name="sort-options"]:checked'
    ) as HTMLInputElement;
    const val = checkedInput?.value;
    setToolbarStatus((prev) => {
      return {
        ...prev,
        sortType: val,
      };
    });
    sortCards(val);
    toggleDropdown("sort");
  };

  return (
    <ButtonWithDropdown icon={FaSort} context="sort">
      <div className={styles.container}>
        <div className={styles.heading}>Sort By:</div>
        <div className={styles.inputWrapper}>
          <input
            type="radio"
            id="confidenceAsc"
            name="sort-options"
            value="confidenceAsc"
          />
          <label htmlFor="html">Confidence (low to high)</label>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="radio"
            id="confidenceDesc"
            name="sort-options"
            value="confidenceDesc"
          />
          <label htmlFor="css">Confidence (high to low)</label>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="radio"
            id="clueAsc"
            name="sort-options"
            value="clueAsc"
          />
          <label htmlFor="javascript">Clue (A-Z)</label>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="radio"
            id="clueDesc"
            name="sort-options"
            value="clueDesc"
          />
          <label htmlFor="javascript">Clue (Z-A)</label>
        </div>
        <br />
        <div id="apply-sort-button">
          <Button onClick={onClickApply}>Apply</Button>
        </div>
      </div>
    </ButtonWithDropdown>
  );
};
