import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MASSDROP",
  description: "Online Shop Cart",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

        <ClerkProvider>
          <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 w-full mb-11 z-50">
              <Header className="mb-8" />
            </header>
            <main className="pt-20 flex-grow">{children}</main>
            <Footer />
          </div>
        </ClerkProvider>
     
  );
}
