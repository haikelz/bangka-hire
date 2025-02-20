import DetailJobPage from "@/components/pages/detail-job-page";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Job({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <DetailJobPage id={id} />
    </div>
  );
}
