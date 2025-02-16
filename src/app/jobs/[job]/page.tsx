import db from "@/lib/db";

interface JobProps {
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
