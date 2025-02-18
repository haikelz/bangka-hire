import Header from "@/components/header";
import { ChildrenProps } from "@/types";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Wrapper from "./wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bangka Hire",
  description:
    "Website Bangka Hire adalah sebuah Website untuk mencari lowongan kerja yang ada di Kepulauan Bangka Belitung.",
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.className} antialiased`}
      >
        <Wrapper>
          <Header />
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
