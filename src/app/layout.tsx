import Header from "../components/Header/Header";
import AuthContextProvider from "@/context/AuthContext";
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
        <AuthContextProvider>
          <header>
            <Header />
          </header>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
