import Link from "next/link";
import styles from "./DeckCard.module.scss";

type DeckCardProps = {
  category: string;
  name: string;
  description: string;
  slug: string;
};

const DeckCard = async ({
  category,
  name,
  description,
  slug,
}: DeckCardProps) => {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.containerInner}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <div className={styles.description}>{description}</div>
        <Link
          href={`/categories/${category}/${slug}`}
          className={styles.cardLink}
        >
          Go study &rarr;
        </Link>
        <DeckCardWrapper />
      </div>
    </div>
  );
};

const DeckCardWrapper = () => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.layer1}></div>
      <div className={styles.layer2}></div>
      <div className={styles.layer3}></div>
    </div>
  );
};

export default DeckCard;
