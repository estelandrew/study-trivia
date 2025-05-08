import Link from "next/link";
import styles from "./CategoriesGrid.module.scss";
import { Rubik } from "next/font/google";
import supabase from "../../../utils/supabase";
//import { getAllCategories } from "@lib/supabase";

const rubik = Rubik({ subsets: ["latin"] });

export const revalidate = 0;

const CategoriesGrid = async () => {
  const { data: categories } = await supabase.from("categories").select(`
    id,
    slug,
    name
  `);
  console.log(">>>> categories: ", categories);
  return (
    <div className={`${styles.container} ${rubik.className}`}>
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
