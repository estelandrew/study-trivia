import type { Metadata } from "next";
import { Rubik, Luckiest_Guy } from "next/font/google";
import Header from "../components/Header/Header";
import "./globals.css";

const rubik = Rubik({
  variable: "--rubik",
  subsets: ["latin"],
});

const luckiestGuy = Luckiest_Guy({
  variable: "--luckiest",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Home | Study Trivia",
  description: "Trivia study guide website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${luckiestGuy.variable} ${rubik.variable}`}>
        <header>
          <Header />
        </header>
        {children}
      </body>
    </html>
  );
}
