import Layout from "@/components/container";
import { DetailJobVacancyProviderPage } from "@/components/pages/detail-job-vacancy-provider-page";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DetailJobVacancyProvider({ params }: Props) {
  const { id } = await params;

  return (
    <Layout>
      <DetailJobVacancyProviderPage id={id} />
    </Layout>
  );
}
