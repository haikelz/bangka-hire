import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

const title = "Auth Error";
const description =
  "Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai langkah pertamamu menuju masa depan !";
const url = "https://bangka-hire.ekel.dev/auth/auth-error";

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

export default function AuthErrorPage() {
  return (
    <div className="min-h-svh w-full flex justify-center p-4 items-center">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <h1 className="font-bold text-2xl md:text-3xl text-center">
          Gagal Login menggunakan Google!
        </h1>
        <div className="space-x-3">
          <Link href="/">
            <Button>Homepage</Button>
          </Link>
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
