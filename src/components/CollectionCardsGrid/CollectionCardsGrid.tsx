import CollectionCard from "@components/CollectionCard/CollectionCard";
import { Collection } from "@/types/types";
import { Props } from "./CollectionsCardsGrid.types";
import styles from "./CollectionCardsGrid.module.scss";

export const revalidate = 0;

const CollectionCardsGrid = async ({ categoryJoinCollections }: Props) => {
  const category = categoryJoinCollections.name;
  const collections = categoryJoinCollections.collections;
  return (
    <div className={`${styles.container}`}>
      {collections?.map((collection: Collection, i: number) => {
        return (
          <CollectionCard
            key={i}
            category={category}
            slug={collection.slug}
            name={collection.name}
            description={collection.description}
          />
        );
      })}
    </div>
  );
};

export default CollectionCardsGrid;
