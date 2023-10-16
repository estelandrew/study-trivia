import Link from "next/link";
import styles from "./CategoriesGrid.module.scss";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

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
