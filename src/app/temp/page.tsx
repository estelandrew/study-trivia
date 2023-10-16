import styles from "./page.module.css";
import supabase from "../../../utils/supabase";
import { getAllDecks } from "../../lib/supabase";

export const revalidate = 0;

export default async function Temp() {
  const decks = await getAllDecks();
  return (
    <main className={styles.main}>
      <div>
        <pre>{JSON.stringify(decks, null, 2)}</pre>
      </div>
    </main>
  );
}
