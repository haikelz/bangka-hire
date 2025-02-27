"use client";

import { getJobs } from "@/services/common";
import { JobProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CardResultJob from "../jobs/card-result-job";
import { IsErrorClient } from "../react-query/is-error-client";
import { IsPendingClient } from "../react-query/is-pending-client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export function DashboardPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isPending, isError } = useQuery({
    queryKey: ["get-jobs", currentPage],
    queryFn: async () =>
      await getJobs({
        page: currentPage,
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
  const totalPages = data?.data?.totalPages ?? 1;

  return (
    <section className="px-8 py-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
        {jobs.map((item, i) => (
          <CardResultJob key={i} data={item} />
        ))}
        {data?.data?.data.length > 8 && totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent className="flex justify-center items-center gap-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={`cursor-pointer bg-primary_color rounded-lg text-white hover:bg-secondary_color_1 hover:text-white ${
                    currentPage === 1 ? "hidden" : ""
                  }`}
                />
              </PaginationItem>
              <span className="font-medium text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < totalPages ? prev + 1 : prev
                    )
                  }
                  className={`cursor-pointer bg-primary_color rounded-lg text-white hover:bg-secondary_color_1 hover:text-white ${
                    currentPage === totalPages ? "hidden" : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
}
