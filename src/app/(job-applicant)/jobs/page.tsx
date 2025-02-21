import { getJobs } from "@/services/common";

export default async function Jobs() {
  const response = await getJobs();

  return (
    <div>
      <div className="text-black">
        <p>Ini kumpulan Jobs</p>
      </div>
    </div>
  );
}
