import { useContext, useState } from "react";
import ButtonWithDropdown from "@components/ButtonWithDropdown/ButtonWithDropdown";
import { FaShuffle } from "react-icons/fa6";
import styles from "./ShuffleDeckButton.module.scss";
import Button from "@components/Button/Button";
import { CardsContext } from "@root/src/hooks/useCardsContext";
import { DeckviewToolbarContext } from "@components/DeckViewToolbar/DeckViewToolbar";
import { useToolbar } from "@hooks/useToolbar";

export const ShuffleDeckButton = () => {
  const { cards, shuffleCards } = useContext(CardsContext);
  const { toggleDropdown, toolbarStatus, setToolbarStatus } = useContext(
    DeckviewToolbarContext
  );

  const handleShuffle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const target = e.currentTarget;
    // setSelections((prev) => {
    //   return {
    //     ...prev,
    //     [target.id]: target.checked,
    //   };
    // });
  };

  const onClickShuffle = () => {
    toggleDropdown("shuffle");
    shuffleCards();
    // if (toolbarStatus.sort) {
    //   sortCards(toolbarStatus.sort);
    // }
  };

  return (
    <ButtonWithDropdown icon={FaShuffle} context="shuffle">
      <div className={styles.container}>
        <div className={styles.heading}>Shuffle Rows:</div>
        <div id="shuffle-button">
          <Button onClick={onClickShuffle}>Shuffle</Button>
        </div>
      </div>
    </ButtonWithDropdown>
  );
};
