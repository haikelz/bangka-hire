import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { ChildrenProps } from "@/types";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
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
  title: "BabelHire",
  description:
    "Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai langkah pertamamu menuju masa depan !",
};

export default async function RootLayout({ children }: ChildrenProps) {
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path") as string;

  const excludedPages = ["/dashboard", "/admin", "/404", "/auth"].some((str) =>
    pathname.includes(str)
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased text-black`}
      >
        <Wrapper>
          {!excludedPages && <Header /> }
          {children}
          {!excludedPages && <Footer /> }
        </Wrapper>
        <Toaster />
      </body>
    </html>
  );
}
