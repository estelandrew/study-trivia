"use client";
import { DeckDataType } from "../../../types";
import styles from "./DeckTableView.module.scss";
import { useDisplayCards } from "../../hooks/useDisplayCards";
import { RevealedAnswer } from "../RevealedAnswer/RevealedAnswer";
import { RevealAnswerButton } from "../RevealAnswerButton/RevealAnswerButton";
import { ConfidenceMeter } from "@components/ConfidenceMeter/ConfidenceMeter";

interface GridDisplayPropsType {
  deckData: DeckDataType;
}

const DeckTableView = ({ deckData }: GridDisplayPropsType) => {
  const {
    categories: { slug },
    cards: fetchedCards,
  } = deckData || {};
  const { cards, updateCardIsRevealed } = useDisplayCards(fetchedCards);
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.headerRow} ${slug}`}>
          <div>Clue</div>
          <div>Answer</div>
          <div>Confidence</div>
        </div>
        {cards.map((card, i) => {
          return (
            <div className={styles.row} key={card.id}>
              <div className={styles.clue}>{card.clue}</div>
              {card.isRevealed ? (
                <RevealedAnswer
                  card={card}
                  i={i}
                  updateCardIsRevealed={updateCardIsRevealed}
                  slug={slug}
                />
              ) : (
                <RevealAnswerButton
                  slug={slug}
                  i={i}
                  updateCardIsRevealed={updateCardIsRevealed}
                />
              )}
              <div className={styles.confidenceMeter}>
                <ConfidenceMeter card={card} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DeckTableView;
