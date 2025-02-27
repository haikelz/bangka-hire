"use client";

import { getJobs } from "@/services/common";
import { JobProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CardResultJob from "../jobs/card-result-job";
import { IsErrorClient } from "../react-query/is-error-client";
import { IsPendingClient } from "../react-query/is-pending-client";

export function DashboardPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["get-jobs"],
    queryFn: async () =>
      await getJobs({
        page: 1,
        limit: 8,
        companyId: "cm7gdjlfp0000uin0najtsxd2",
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending)
    return <IsPendingClient className="w-full mt-10 min-h-svh h-full" />;
  if (isError) return <IsErrorClient />;

  const jobs = data?.data?.data as JobProps[];

  return (
    <section className="px-8 py-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
        {jobs.map((item, i) => (
          <CardResultJob key={i} data={item} />
        ))}
      </div>
    </section>
  );
}
