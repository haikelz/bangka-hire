"use client";

import { getJobVacancyProviders } from "@/services/common";
import { UserProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CardSearchJobVacancyProvider from "../card-search-job-vacancy-provider";
import Layout from "../container";

export function SearchJobVacancyProviderPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["job-vacancy-providers"],
    queryFn: async () => await getJobVacancyProviders(),
    refetchOnWindowFocus: false,
  });

  if (isPending) return <p>sdf</p>;
  if (isError) return <p>SEmentera</p>;

  const jobVacancyProviders = data?.data?.data as UserProps[];

  return (
    <>
      {jobVacancyProviders && jobVacancyProviders.length ? (
        <Layout>
          {/* Kumpulan card cari perushaan */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
            {jobVacancyProviders.map((item, i) => (
              <CardSearchJobVacancyProvider key={i} data={item} />
            ))}
          </div>
        </Layout>
      ) : (
        <p className="text-xl font-bold text-center">
          Saat ini belum ada perusahaan yang ditampilkan!
        </p>
      )}
    </>
  );
}
