import styles from "./DeckCardsGrid.module.scss";
import DeckCard from "../DeckCard/DeckCard";

export const revalidate = 0;

type DataType = {
  id: number;
  slug: string;
  name: string;
  decks: {
    id: number;
    slug: string;
    name: string;
    description: string;
  }[];
} | null;

const DeckCardsGrid = async ({
  data,
  category,
}: {
  data: DataType;
  category: string;
}) => {
  const decks = data?.decks;
  return (
    <div className={`${styles.container}`}>
      {decks?.map((deck, i) => {
        return (
          <DeckCard
            key={i}
            category={category}
            slug={deck.slug}
            name={deck.name}
            description={deck.description}
          />
        );
      })}
    </div>
  );
};

export default DeckCardsGrid;
