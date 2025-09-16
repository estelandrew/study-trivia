import Header from "../components/Header/Header";
import AuthContextProvider from "@/context/AuthContext";
import UserLearnedEntriesContextProvider from "@/context/UserLearnedEntriesContext";
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
          <UserLearnedEntriesContextProvider>
            <header>
              <Header />
            </header>
            <main>
              <div className="main-content-container">{children}</div>
            </main>
            <footer>[Footer]</footer>
          </UserLearnedEntriesContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
