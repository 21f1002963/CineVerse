import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";
import StoreProvider from "../providers/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";
import NpProgressProvider from "@/providers/NpProgressProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CineVerse",
  description: "A unique streaming experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/cineverse-logo.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <StoreProvider>
          <AuthProvider>
            <NpProgressProvider />
            <Header />
            {children}
            <Footer />
            <Toaster />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
