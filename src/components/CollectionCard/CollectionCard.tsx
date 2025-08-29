import Link from "next/link";
import { Props } from "./CollectionCard.types";
import styles from "./CollectionCard.module.scss";

const CollectionCard = async ({ category, name, description, slug }: Props) => {
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
      </div>
    </div>
  );
};

export default CollectionCard;
