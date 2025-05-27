import Link from "next/link";

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
    <>
      <div>{name}</div>
      <div>{description}</div>
      <Link href={`/categories/${category}/${slug}`}>
        Go to category &rarr;
      </Link>
    </>
  );
};

export default DeckCard;
