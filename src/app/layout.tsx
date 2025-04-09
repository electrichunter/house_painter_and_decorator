import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=  ""
       
        style={{ fontFamily: "ui-sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
 