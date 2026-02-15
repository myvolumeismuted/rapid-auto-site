import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "./components/ui/sonner";
import "./globals.css";
import "./index.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mobile Mechanic Service - Professional Auto Repair at Your Location",
  description: "Expert mobile mechanic service. We come to you for oil changes, brake service, diagnostics, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}