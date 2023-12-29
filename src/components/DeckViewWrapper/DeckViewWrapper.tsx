"use client";

import styles from "./DeckViewWrapper.module.scss";
import ButtonWithDropdown from "@components/ButtonWithDropdown/ButtonWithDropdown";
import DeckViewFlashcards from "@components/DeckViewFlashcards/DeckViewFlashcards";
import DeckTableView from "@components/DeckTableView/DeckTableView";
import DeckViewToolbar from "@components/DeckViewToolbar/DeckViewToolbar";
import { DeckDataType } from "@root/types";
import { useToolbar } from "@hooks/useToolbar";
import { DeckViews } from "@root/types";

type PropsType = {
  data: DeckDataType;
};

const DeckViewWrapper = ({ data }: PropsType) => {
  const { currentView, toggleView } = useToolbar();
  return (
    <div className={styles.container}>
      <DeckViewToolbar currentView={currentView} toggleView={toggleView} />
      {currentView.type === DeckViews.Cards && <DeckViewFlashcards />}
      {currentView.type === DeckViews.Table && (
        <DeckTableView deckData={data} />
      )}
    </div>
  );
};

export default DeckViewWrapper;
