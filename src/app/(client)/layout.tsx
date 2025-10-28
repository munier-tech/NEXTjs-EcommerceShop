// src/app/(client)/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";

// ✅ Only use next/font/google, no Tailwind font class
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MASSDROP",
  description: "Online Shop Cart",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* ✅ Use only the hashed font class from next/font/google */}
        <body
          className={`${poppins.className} flex flex-col min-h-screen antialiased`}
        >
          {/* Header */}
          <header className="fixed top-0 left-0 w-full mb-11 z-50">
            <Header className="mb-8" />
          </header>

          {/* Main Content */}
          <main className="pt-20 flex-grow">{children}</main>

          {/* Footer */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
