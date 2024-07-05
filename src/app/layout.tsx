import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import ProviderWrapper from "@/components/ProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Findmybook App using Next",
  description: "My Beautiful App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderWrapper>
          <div className="w-full max-w-7xl mx-auto">
        <Header />
        <main className="min-h-[90vh] h-fit">
        {children}
        </main>
        <Footer />
        </div>
        </ProviderWrapper>
        </body>
    </html>
  );
}
