import styles from "./page.module.css";
import supabase from "../../../utils/supabase";

export const revalidate = 0;

export default async function Temp() {
  const { data: posts } = await supabase.from("decks").select(`
    id,
    name,
    description,
    cards (id, clue, answer)
  `);
  return (
    <main className={styles.main}>
      <div>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </div>
    </main>
  );
}
