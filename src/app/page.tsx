import PageSection from "@components/PageSection/PageSection";
import Search from "@components/Search/Search";
import Flashcard from "@components/Flashcard/Flashcard";
import BrowseGrid from "@components/BrowseGrid/BrowseGrid";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <PageSection headerText="What do you want to study?">
        <Search />
      </PageSection>
      <PageSection headerText="Browse">
        <BrowseGrid />
      </PageSection>
      <PageSection headerText="Random">
        <Flashcard />
      </PageSection>
    </main>
  );
}
