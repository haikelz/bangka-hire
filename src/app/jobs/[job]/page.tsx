import db from "@/lib/db";

type JobProps = {
  params: {
    job : string;
  };
}


export default async function Job({ params }: JobProps) {
  const { job } = await params;



  return (
    <div>
      <div>Test Job</div>
      <div>{job}</div>
    </div>
  );
}
