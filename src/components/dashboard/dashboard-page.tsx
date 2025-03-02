"use client";

import { useCurrentUser, useCurrentUserGoogle } from "@/hooks/use-current-user";
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
  const { user } = useCurrentUser();
  const userGoogle = useCurrentUserGoogle();

  const userId = user ? user.id : userGoogle?.id;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isPending, isError } = useQuery({
    queryKey: ["get-jobs", currentPage, userId],
    queryFn: async () =>
      await getJobs({
        page: currentPage,
        limit: 8,
        id: userId,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending)
    return (
      <div className="w-full px-4 md:px-8">
        <IsPendingClient className="w-full my-10 min-h-svh h-full" />
      </div>
    );
  if (isError) return <IsErrorClient />;

  const jobs = data?.data?.data as JobProps[];
  const totalPages = data?.data?.totalPages ?? 1;

  return (
    <section className="px-8 py-8 w-full">
      {jobs.length && jobs ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
          {jobs.map((item, i) => (
            <CardResultJob key={i} data={item} />
          ))}
        </div>
      ) : (
        <p className="text-xl font-bold text-center">
          Kamu belum menambahkan lowongan kerja apapun!
        </p>
      )}
      {data?.data?.data.length > 8 && totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex justify-center items-center gap-2">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
    </section>
  );
}
