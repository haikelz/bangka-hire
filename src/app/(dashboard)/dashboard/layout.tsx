import Footer from "@/components/dashboard/footer";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ChildrenProps } from "@/types";
import { Metadata } from "next";

const title = "Dashboard Perusahaan | Bangka Hire";
const description =
  "Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai langkah pertamamu menuju masa depan !";
const url = "https://bangka-hire.ekel.dev/dashboard";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    images: [
      {
        url,
        alt: "OG Image",
      },
    ],
    siteName: "bangka-hire.ekel.dev",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default function Layout({ children }: ChildrenProps) {
  return (
    <div className="flex justify-start items-start w-full">
      <Sidebar />
      <div className="w-full h-full">
        <Header />
        <div className="w-full min-h-svh">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
