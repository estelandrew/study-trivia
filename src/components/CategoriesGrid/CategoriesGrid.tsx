import Link from "next/link";
import styles from "./CategoriesGrid.module.scss";
import { Rubik } from "next/font/google";
import { getAllCategories } from "@lib/supabase";

const rubik = Rubik({ subsets: ["latin"] });

export const revalidate = 0;

const CategoriesGrid = async () => {
  const categories = await getAllCategories();
  return (
    <div className={`${styles.container} ${rubik.className}`}>
      {categories?.map((category) => {
        return (
          <div key={category.id} className={`${styles.card} ${category.slug}`}>
            <Link href={`/categories/${category.slug}`}>{category.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesGrid;
