import { getAllCategories } from "@/lib/api";
import Link from "next/link";
import styles from "./CategoriesGrid.module.scss";

export const revalidate = 0;

const CategoriesGrid = async () => {
  const categories = await getAllCategories();

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
