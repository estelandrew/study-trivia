"use client";
import { useEffect, useState } from "react";
import { DeckDataType } from "../../../types";
import styles from "./DeckTableView.module.scss";
import CardAnswer from "@components/CardAnswer/CardAnswer";
import { ConfidenceMeter } from "@components/ConfidenceMeter/ConfidenceMeter";
import { CardDataType } from "../../../types";
import { getConfidenceLevelStorage } from "@lib/localStorage";
import { ConfidenceLevelStorageType } from "../../../types";

interface GridDisplayPropsType {
  deckData: DeckDataType;
}

const DeckTableView = ({ deckData }: GridDisplayPropsType) => {
  const [confidenceLevelStorage, setConfidenceLevelStorage] =
    useState<ConfidenceLevelStorageType | null>(null);

  useEffect(() => {
    setConfidenceLevelStorage(getConfidenceLevelStorage());
  }, []);

  const {
    categories: { slug },
    cards,
  } = deckData || {};

  const updateCardIsRevealed = () => {
    console.log("reveal card");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.headerRow}`}>
          <div>Clue</div>
          <div></div>
          <div>Confidence</div>
        </div>
        {cards?.map((card, i) => {
          return (
            <div className={styles.row} key={card.id}>
              <div className={styles.clue}>{card.clue}</div>
              <div className={styles.answer}>
                <CardAnswer answer={card.answer} />
              </div>
              <div className={styles.confidenceMeter}>
                <ConfidenceMeter
                  cardId={card.id}
                  confidenceLevelStorage={confidenceLevelStorage}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DeckTableView;
