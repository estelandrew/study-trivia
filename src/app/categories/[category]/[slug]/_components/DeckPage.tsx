"use client";

import PageHeader from "@components/PageHeader/PageHeader";
import styles from "./DeckPage.module.scss";
import { DeckDataType } from "@root/types";
import DeckViewWrapper from "@components/DeckViewWrapper/DeckViewWrapper";
import { TbTallymarks } from "react-icons/tb";
import { CardsContext, useCardsContext } from "@hooks/useCardsContext";

type PropsType = {
  data: DeckDataType;
};

const DeckPage = ({ data }: PropsType) => {
  const { slug, name, description, cards } = data || {};
  const { cardsFS, filterCards } = useCardsContext(cards);

  return (
    <>
      <CardsContext.Provider value={{ cards, cardsFS, filterCards }}>
        <PageHeader categorySlug={slug} text={name} description={description} />
        <div className={styles.row}>
          <div>
            <TbTallymarks />
          </div>
          <div>{cards?.length} Rows</div>
        </div>
        <DeckViewWrapper />
      </CardsContext.Provider>
    </>
  );
};

export default DeckPage;
