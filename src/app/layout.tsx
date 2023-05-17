import "./globals.css";
import { Rubik } from "next/font/google";
import Header from "../components/Header/Header";
import styles from "./page.module.css";

const roboto_mono = Rubik({ subsets: ["latin"] });

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
      <body className={roboto_mono.className}>
        <header>
          <Header />
        </header>
        <div className={styles.bodyWrapper}>{children}</div>
      </body>
    </html>
  );
}
