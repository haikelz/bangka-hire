import DetailJobPage from "@/components/pages/detail-job-page";
import { APIRouteParamsProps } from "@/types";

export default async function Job({ params }: APIRouteParamsProps) {
  const { id } = await params;

  return (
    <div>
      <DetailJobPage job_id={id} />
    </div>
  );
}
