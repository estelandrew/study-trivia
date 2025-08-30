import Link from "next/link";
import { getCategories } from "@/lib/api";
import styles from "./CategoriesGrid.module.scss";

export const revalidate = 0;

const CategoriesGrid = async () => {
  const categories = await getCategories();

  return (
    <div className={`${styles.container}`}>
      {categories?.map((category) => {
        return (
          <div key={category.id} className={`${styles.card}`}>
            <Link href={`/categories/${category.slug}`}>{category.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesGrid;
