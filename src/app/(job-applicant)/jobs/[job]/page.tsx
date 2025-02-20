import DetailJobPage from "@/components/pages/detail-job-page";

type Props = {
  params: Promise<{ job: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Job({ params }: Props) {
  const { job } = await params;

  return (
    <div>
      <DetailJobPage id={job} />
    </div>
  );
}
