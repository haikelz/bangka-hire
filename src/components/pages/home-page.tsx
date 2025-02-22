"use client";

import { getJobs } from "@/services/common";
import { JobProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CardResultJob from "../card-result-job";
import Layout from "../container";
import FormSearchJob from "../form-search-job";
import { IsErrorClient } from "../react-query/is-error-client";
import { IsPendingClient } from "../react-query/is-pending-client";

export default function HomePage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["get-jobs"],
    queryFn: async () => await getJobs(1, 1),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isPending) return <IsPendingClient className="my-10 h-52" />;
  if (isError) return <IsErrorClient />;

  const jobVacancies = data?.data?.data as JobProps[];

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
          Belum ada lowongan kerja!
        </p>
      )}
    </Layout>
  );
}
