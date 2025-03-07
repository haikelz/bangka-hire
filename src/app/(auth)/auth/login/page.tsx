import { LoginFormJobApplicant } from "@/components/auth/login-form";
import type { Metadata } from "next";

const title = "Login to Bangka Hire";
const description =
  "Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai langkah pertamamu menuju masa depan !";
const url = "https://bangka-hire.ekel.dev/auth/login";

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

export default async function Login() {
  return (
    <main className="bg-[#F3F9FF] w-full py-10 flex min-h-svh justify-center items-center">
      <section className="mx-auto max-w-lg w-full px-4 md:px-0">
        <LoginFormJobApplicant />
      </section>
    </main>
  );
}
