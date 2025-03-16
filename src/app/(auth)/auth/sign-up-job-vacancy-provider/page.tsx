import { SignUpFormJobVacancyProvider } from "@/components/auth/sign-up-form-job-vacancy-provider";
import type { Metadata } from "next";

const title = "Sign Up Untuk Pemberi Kerja | Bangka Hire";
const description =
  "Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai langkah pertamamu menuju masa depan !";
const url = "https://bangka-hire.ekel.dev/auth/sign-up-job-vacancy-provider";

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

export default function SignUpJobVacancyProvider() {
  return (
    <main className="bg-[#F3F9FF] w-full py-10 flex min-h-svh justify-center items-center">
      <section className="mx-auto max-w-lg w-full px-4 md:px-0">
        <SignUpFormJobVacancyProvider />
      </section>
    </main>
  );
}
