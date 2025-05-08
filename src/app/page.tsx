import CategoriesGrid from "@/components/CategoriesGrid/CategoriesGrid";
import PageSection from "@/components/PageSection/PageSection";
import Search from "@/components/Search/Search";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PageSection headerText="What do you want to study?">
          <Search />
        </PageSection>
        <PageSection headerText="Browse">
          <CategoriesGrid />
        </PageSection>
      </main>
      <footer className={styles.footer}>[Footer]</footer>
    </div>
  );
}
