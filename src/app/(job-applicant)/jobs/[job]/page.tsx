import DetailJobPage from "@/components/pages/detail-job-page";

interface JobProps {
  params: {
    job: string;
  };
}

export default async function Job({ params }: JobProps) {
  const { job } = await params;
  return (
    <div>
      <DetailJobPage id={job} />
    </div>
  );
}
