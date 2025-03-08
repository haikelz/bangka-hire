import Layout from "@/components/common/container";
import { DetailJobVacancyProviderPage } from "@/components/job-vacancy-provider/detail-job-vacancy-provider-page";
import type { APIRouteParamsProps } from "@/types";

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
