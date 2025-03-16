import { JobDetailPage } from "@/components/dashboard/job-detail-page";
import type { APIRouteParamsProps } from "@/types";

export default async function JobDetail({ params }: APIRouteParamsProps) {
  const { id } = await params;
  return <JobDetailPage id={id} />;
}
