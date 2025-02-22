import Layout from "@/components/container";
import { DetailJobVacancyProviderPage } from "@/components/pages/detail-job-vacancy-provider-page";
import { APIRouteParamsProps } from "@/types";

export default async function DetailJobVacancyProvider({
  params,
}: APIRouteParamsProps) {
  const { id } = await params;

  return (
    <Layout>
      <DetailJobVacancyProviderPage id={id} />
    </Layout>
  );
}
