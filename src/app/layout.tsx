import "./globals.css";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layouts";

import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../assets/VTBGroupUI-Regular/VTBGroupUI-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/VTBGroupUI-DemiBold/VTBGroupUI-DemiBold.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Офисы ВТБ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
