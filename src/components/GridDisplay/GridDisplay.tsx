"use client";
import { DeckDataType } from "../../../types";
import styles from "./GridDisplay.module.scss";
import { useDisplayCards } from "../../hooks/useDisplayCards";
import { RevealedAnswer } from "../RevealedAnswer/RevealedAnswer";
import { RevealAnswerButton } from "../RevealAnswerButton/RevealAnswerButton";
import { ConfidenceMeter } from "@components/ConfidenceMeter/ConfidenceMeter";

interface GridDisplayPropsType {
  deckData: DeckDataType;
}

export const GridDisplay = ({ deckData }: GridDisplayPropsType) => {
  const { cards, updateCardIsRevealed } = useDisplayCards(deckData.cards);

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.headerRow} ${deckData.categories.slug}`}>
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
                  slug={deckData.categories.slug}
                />
              ) : (
                <RevealAnswerButton
                  slug={deckData.categories.slug}
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
