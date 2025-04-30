import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>[main content]</main>
      <footer className={styles.footer}>[Footer]</footer>
    </div>
  );
}
