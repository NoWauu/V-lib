import type { Metadata } from "next";

import { Toaster } from "sonner";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Accueil • V-lib",
    template: "%s • V-lib",
  },
  description: "Projet universitaire, application de location de vélib.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="relative flex flex-col min-h-screen h-full">
          <Navbar />
          <div className="flex-grow flex-col flex">{children}</div>
          <Footer />
        </main>
        <Toaster
          richColors={true}
          visibleToasts={1}
          offset={100}
          position="top-center"
        />
      </body>
    </html>
  );
}
