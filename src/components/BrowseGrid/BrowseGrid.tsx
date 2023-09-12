import styles from "./BrowseGrid.module.scss";
import { Rubik } from "next/font/google";
import supabase from "../../../utils/supabase";
import { slugifyCategoryName } from "../../lib/helpers";

const rubik = Rubik({ subsets: ["latin"] });

export const revalidate = 0;

const BrowseGrid = async () => {
  const { data: posts } = await supabase.from("categories").select();
  return (
    <div className={`${styles.container} ${rubik.className}`}>
      {posts?.map((category) => {
        let categoryStyle = slugifyCategoryName(category.name);
        return (
          <div key={category.id} className={`${styles.card} ${categoryStyle}`}>
            <span className={styles.cardText}>{category.name}</span>
          </div>
        );
      })}
    </div>
  );

  // return <pre>{JSON.stringify(posts, null, 2)}</pre>;
};

export default BrowseGrid;
