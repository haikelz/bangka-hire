import { EditJobVacancyProviderProfilePage } from "@/components/dashboard/edit-job-vacancy-provider-profile-page";
import { Metadata } from "next";

const title = "Profile Pemberi Kerja | Bangka Hire";
const description =
  "Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai langkah pertamamu menuju masa depan !";
const url = "https://bangka-hire.ekel.dev/dashboard/profile";

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

export default function JobVacancyProviderProfile() {
  return <EditJobVacancyProviderProfilePage />;
}
