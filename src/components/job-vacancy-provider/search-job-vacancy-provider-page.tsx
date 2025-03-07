"use client";

import { getJobVacancyProviders } from "@/services/common";
import { valueSearchCompany } from "@/store";
import type { ProfilCompanyProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Search } from "lucide-react";
import Image from "next/image";
import { type FormEvent, useEffect, useState } from "react";
import hero from "../../../public/assets/cari-perusahaan.png";
import Layout from "../common/container";
import { IsErrorClient } from "../react-query/is-error-client";
import { IsPendingClient } from "../react-query/is-pending-client";
import { Input } from "../ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import CardSearchJobVacancyProvider from "./card-search-job-vacancy-provider";

export function SearchJobVacancyProviderPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCompany, setSearchCompany] = useAtom(valueSearchCompany);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchCompany]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["job-vacancy-providers", searchCompany, currentPage],
    queryFn: async () =>
      await getJobVacancyProviders(currentPage, 8, searchCompany),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  function handleSubmitSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSearchCompany(formData.get("company") as string);
  }

  if (isError) return <IsErrorClient />;

  const jobVacancyProviders = data?.data?.data as ProfilCompanyProps[];
  const totalPages = data?.data?.totalPages ?? 1;

  return (
    <main>
      <section className="space-y-8 xl:space-y-14 mb-10">
        {/* Gambar dan tagline */}
        <div className="w-full h-52 sm:h-full">
          {/* Tagline */}
          <div className="w-full h-full flex justify-center items-center bg-gradient-to-r from-secondary_color_1 to-primary_color">
            <Layout>
              <div className="sm:flex w-full sm:justify-between sm:items-center lg:items-start">
                {/* tagline singkat */}
                <div className="md:space-y-6 space-y-2 w-full sm:w-2/3 lg:w-1/2 lg:pt-16 py-4 sm:py-10 text-white">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                    Explore lebih banyak perusahaan
                  </h1>
                  <form onSubmit={handleSubmitSearch}>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Cari perusahaan"
                        className="w-full text-xs md:text-sm xl:text-base md:w-[80%] xl:w-1/2 px-8 md:px-9 py-1 md:py-4 lg:py-6 bg-white text-gray-500 font-medium focus:border-none focus:outline-none"
                        name="company"
                        id="company"
                      />
                      <Search
                        width={20}
                        color="#6b7280"
                        className="absolute top-1 left-2 md:top-[5px] lg:top-3 lg:left-3"
                      />
                    </div>
                  </form>
                </div>
                {/* Gambar */}
                <Image
                  src={hero}
                  alt="hero"
                  className="hidden sm:block sm:w-[40%] lg:w-1/2"
                />
              </div>
            </Layout>
          </div>
        </div>
      </section>
      {isPending ? (
        <IsPendingClient className="my-10 h-64" />
      ) : jobVacancyProviders && jobVacancyProviders.length ? (
        <Layout>
          <div className="mb-4">
            <h1 className="font-bold md:text-lg">Jelajahi Perusahaan</h1>
            <p className="text-sm md:text-base">
              Lihat lebih banyak lagi dan berikan ulasan perusahaan
            </p>
          </div>

          {/* Kumpulan card cari perushaan */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
            {jobVacancyProviders.map((item, i) => (
              <CardSearchJobVacancyProvider key={i} data={item} />
            ))}
          </div>
          {/* Pagination */}
          {data?.data?.totalItems > 8 && totalPages > 1 && (
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
        </Layout>
      ) : (
        <p className="text-xl font-bold text-center">
          Belum ada perusahaan yang ditampilkan!
        </p>
      )}
    </main>
  );
}
