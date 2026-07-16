import Header from "../components/Header/Header";
import AuthContextProvider from "@/context/AuthContext";
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
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
          <ContentWrapper>
            <header>
              <Header />
            </header>
          </ContentWrapper>
          <main>
            <div className="main-content-container">{children}</div>
          </main>
          <footer></footer>
        </AuthContextProvider>
      </body>
    </html>
  );
}
