"use client";

import styles from "./DeckViewWrapper.module.scss";
import DeckViewFlashcards from "@components/DeckViewFlashcards/DeckViewFlashcards";
import DeckTableView from "@components/DeckTableView/DeckTableView";
import DeckViewToolbar from "@components/DeckViewToolbar/DeckViewToolbar";
import { DeckDataType } from "@root/types";
import { useToolbar } from "@hooks/useToolbar";
import { DeckViews } from "@root/types";

// type PropsType = {
//   data: DeckDataType;
// };

const DeckViewWrapper = () => {
  //const [cards, setCards] = useState<DeckDataType>(data);
  const { currentView, toggleView } = useToolbar();
  return (
    <div className={styles.container}>
      <DeckViewToolbar />
      {currentView.type === DeckViews.Cards && <DeckViewFlashcards />}
      {currentView.type === DeckViews.Table && <DeckTableView />}
    </div>
  );
};

export default DeckViewWrapper;
