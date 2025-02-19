import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { ChildrenProps } from "@/types";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Wrapper from "./wrapper";
import ClientLayout from "@/components/client-layout";

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

  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased text-black`}
      >
          <ClientLayout>
            {children}
          </ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
