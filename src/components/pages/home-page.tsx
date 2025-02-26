"use client";

import { getJobs } from "@/services/common";
import { JobProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CardResultJob from "../card-result-job";
import Layout from "../container";
import FormSearchJob from "../form-search-job";
import { IsErrorClient } from "../react-query/is-error-client";
import { IsPendingClient } from "../react-query/is-pending-client";
import { useAtomValue } from "jotai";
import { searchJob, valueFilterCity, valueFilterSalary } from "@/store";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  // value dari atom search
  const valueSearch = useAtomValue(searchJob);
  const valueLocation = useAtomValue(valueFilterCity);
  const valueSalary = useAtomValue(valueFilterSalary);

  // untuk fix tidak search jika sedang di page 2
  useEffect(() => {
    setCurrentPage(1);
  }, [valueSearch, valueLocation, valueSalary]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["get-jobs", valueSearch, valueLocation, valueSalary, currentPage],
    queryFn: async () => await getJobs(currentPage, 8, valueSearch, valueLocation, valueSalary),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isError) return <IsErrorClient />;

  const jobVacancies = data?.data?.data as JobProps[];
  const totalPages = data?.data?.totalPages ?? 1;

  return (
    <Layout>
      {/* Search Bar dan filter */}
      <div className="bg-secondary_color_1 rounded-lg p-10 my-12">
        <FormSearchJob />
      </div>

      {/* Card Job */}
      {isPending ? <IsPendingClient className="my-10 h-52" /> :
        jobVacancies.length ?
        (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
              {jobVacancies.map((item, i) => (
                <CardResultJob key={i} data={item} />
              ))}
            </div>

            {/* Pagination */}
            {(data?.data?.totalItems > 8 && totalPages > 1)  && (
            <Pagination className="mt-10">
              <PaginationContent className="flex justify-center items-center gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={`cursor-pointer bg-primary_color rounded-lg text-white hover:bg-secondary_color_1 hover:text-white ${currentPage === 1 ? 'hidden' : ''}`}
                  />
                </PaginationItem>
                <span className="font-medium text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                    className={`cursor-pointer bg-primary_color rounded-lg text-white hover:bg-secondary_color_1 hover:text-white ${currentPage === totalPages ? 'hidden' : ''}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
          </>
        ) : (
          <p className="text-xl font-bold text-center">
            Belum ada lowongan kerja!
          </p>
        )}


    </Layout>
  );
}
