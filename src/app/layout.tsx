import Header from "../components/Header/Header";
import type { Metadata } from "next";
import "./globals.css";
import { rubik } from "@utils/fonts";

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
    <html lang="en" className={`${rubik.className}`}>
      <body>
        <header>
          <Header />
        </header>
        {children}
      </body>
    </html>
  );
}
