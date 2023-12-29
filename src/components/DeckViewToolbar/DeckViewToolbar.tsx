import styles from "./DeckViewToolbar.module.scss";
import ButtonWithDropdown from "@components/ButtonWithDropdown/ButtonWithDropdown";
import { FaCheck } from "react-icons/fa";
import { PiCardsBold } from "react-icons/pi";
import { BsTable } from "react-icons/bs";
import { DeckViews } from "@root/types";

type PropsType = {
  toggleView: (type: DeckViews) => void;
  currentView: {
    type: DeckViews;
  };
};

const DeckViewToolbar = ({ toggleView, currentView }: PropsType) => {
  const viewItems = [
    { type: DeckViews.Cards, label: "Flash Cards View", isSelected: true },
    { type: DeckViews.Table, label: "Table View", isSelected: true },
  ];

  const Icon = currentView.type === DeckViews.Cards ? PiCardsBold : BsTable;
  const label =
    currentView.type === DeckViews.Cards
      ? viewItems[0].label
      : viewItems[1].label;

  return (
    <div className={styles.toolbar}>
      <ButtonWithDropdown
        text="View"
        icon={Icon}
        label={label}
        currentView={currentView}
      >
        <div className={styles.viewControl}>
          {viewItems.map((item, i) => {
            const isCurrentView = currentView.type === item.type;
            return (
              <div
                key={item.type + i}
                className={styles.viewControlItem}
                onClick={() => toggleView(item.type)}
              >
                <div className={styles.viewControlItemCheckPlaceholder}>
                  {isCurrentView && <FaCheck />}
                </div>
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>
      </ButtonWithDropdown>
    </div>
  );
};

export default DeckViewToolbar;
