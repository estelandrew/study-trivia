import "./globals.css";
import { Rubik } from "next/font/google";
import Header from "../components/Header/Header";
import styles from "./page.module.scss";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Home | Study Trivia",
  description: "Trivia study guide website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <header>
          <Header />
        </header>
        <div className={styles.bodyWrapper}>{children}</div>
      </body>
    </html>
  );
}
