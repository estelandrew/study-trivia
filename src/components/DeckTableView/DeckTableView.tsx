"use client";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { CardDataType, DeckDataType } from "../../../types";
import styles from "./DeckTableView.module.scss";
import CardAnswer from "@components/CardAnswer/CardAnswer";
import { ConfidenceMeter } from "@components/ConfidenceMeter/ConfidenceMeter";
import { getConfidenceLevelStorage } from "@lib/localStorage";
import { ConfidenceLevelStorageType } from "../../../types";
import { CardsContext } from "@hooks/useCardsContext";

const DeckTableView = () => {
  //const [confidenceLevelStorage, setConfidenceLevelStorage] =
  useState<ConfidenceLevelStorageType | null>(null);
  const { deckId, cards, liveCards, isCardsLoading, initCards } =
    useContext(CardsContext);

  useEffect(() => {
    initCards();
  }, [initCards]);

  const updateCardIsRevealed = () => {
    console.log("reveal card");
  };

  const Row = ({ card }: { card: CardDataType }) => {
    return (
      <div className={styles.row} key={card.id}>
        <div className={styles.clue}>{card.clue}</div>
        <div className={styles.answer}>
          <CardAnswer answer={card.answer} />
        </div>
        <div className={styles.confidenceMeter}>
          <ConfidenceMeter
            deckId={deckId}
            cardId={card.id}
            initialConfidenceLevel={card.confidenceLevel}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.headerRow}`}>
          <div>Clue</div>
          <div></div>
          <div>Confidence</div>
        </div>
        {liveCards.length > 0
          ? liveCards.map((card) => {
              return <Row key={card.id} card={card} />;
            })
          : cards?.map((card) => {
              return <Row key={card.id} card={card} />;
            })}
      </div>
    </>
  );
};

export default DeckTableView;
