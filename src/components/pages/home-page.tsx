"use client";

import { getJobs } from "@/services/common";
import { JobProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CardResultJob from "../card-result-job";
import Layout from "../container";
import FormSearchJob from "../form-search-job";

export default function HomePage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["data"],
    queryFn: async () => await getJobs(1, 1),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return <p>fsdf</p>;
  if (isError) return <p>sdfsdf</p>;

  const jobVacancies = data.data.data as JobProps[];

  return (
    <Layout>
      {/* Search Bar dan filter */}
      <div className="bg-secondary_color_1 rounded-lg p-10 my-12">
        <FormSearchJob />
      </div>

      {/* Card Job */}
      {jobVacancies && jobVacancies.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
          {jobVacancies.map((item, i) => (
            <CardResultJob key={i} data={item} />
          ))}
        </div>
      ) : (
        <p className="text-xl font-bold text-center">
          Saat ini Belum ada lowongan kerja!
        </p>
      )}
    </Layout>
  );
}
