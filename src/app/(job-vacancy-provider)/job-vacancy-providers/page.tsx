import { SearchJobVacancyProviderPage } from "@/components/job-vacancy-provider/search-job-vacancy-provider-page";
import type { Metadata } from "next";

const title = "Cari Perusahaan | Bangka Hire";
const description =
  "Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai langkah pertamamu menuju masa depan !";
const url = "https://bangka-hire.ekel.dev/job-vacancy-providers";

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

export default function SearchJob() {
  return (
    <>
      <SearchJobVacancyProviderPage />
    </>
  );
}
