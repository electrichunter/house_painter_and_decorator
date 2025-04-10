import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "./companent/menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="bg-[#f9f9f9] text-gray-800 antialiased pt-4 sm:pt-5">
        <Menu />
        <main className="pt-16 sm:pt-20">{children}</main>
      </body>
    </html>
  );
}
