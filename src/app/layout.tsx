import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import ProviderWrapper from "@/components/ProviderWrapper";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';



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
        <div className="flex flex-col w-full min-h-screen ">
  <Header />
  <main className="flex-grow">
    {children}
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
  </main>
  <Footer />
</div>

        </ProviderWrapper>
        </body>
    </html>
  );
}
