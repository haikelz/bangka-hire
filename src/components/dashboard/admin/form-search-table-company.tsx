"use client";

import { IsPendingClient } from "@/components/react-query/is-pending-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getJobVacancyProviders } from "@/services/common";
import { ProfilCompanyProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export default function FormSearchAndTableCompany() {
  const [currentPageCompany, setCurrentPageCompany] = useState(1);
  const [valueCompany, setValueCompany] = useState<string>("");

  const { data, isPending, isError } = useQuery({
    queryKey: ["jobVacancies", valueCompany, currentPageCompany],
    queryFn: async () => {
      return await getJobVacancyProviders(currentPageCompany, 10, valueCompany);
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const jobVacancies = data?.data.data;
  const totalPages = data?.data.totalPages ?? 1;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setValueCompany(formData.get("search-company") as string);
  }

  return (
    <div className="bg-secondary_color_2 rounded-lg p-6 space-y-3">
      {/* judul dan search company */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Company List</h1>
        <form onSubmit={handleSubmit} className="w-1/3">
          <div className="relative">
            <Input
              placeholder="Search Company"
              name="search-company"
              id="search-company"
              className=" border-primary_color pl-10"
            />
            <SearchIcon className="w-5 h-5 absolute top-1/2 left-2 -translate-y-1/2 text-black" />
          </div>
        </form>
      </div>

      {/* tabel nama,no,email */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-gray-300 text-left">
              <th className="w-1/12 px-4 py-2">No</th>
              <th className="w-3/12 px-4 py-2">Nama Perusahaan</th>
              <th className="w-3/12 px-4 py-2">Email</th>
              <th className="w-2/12 px-4 py-2">Status</th>
              <th className="w-[6%] px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <tr>
                <td colSpan={5} className="py-2 text-center">
                  <IsPendingClient className="my-1 h-40 w-full" />
                </td>
              </tr>
            ) : jobVacancies.length ? (
              <>
                {jobVacancies.map((user: ProfilCompanyProps, index: any) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.user?.full_name}</td>
                    <td className="px-4 py-2">{user.user?.email}</td>
                    <td className="px-4 py-2">
                      <span className="text-blue-500">Active</span>
                    </td>
                    <td className="px-4 py-2">
                      <Button className="text-gray-500 hover:text-gray-700 bg-transparent text-2xl border-none shadow-none hover:bg-transparent">
                        ⋮
                      </Button>
                    </td>
                  </tr>
                ))}

                {/* Pagination */}
                {data?.data?.totalItems > 10 && totalPages > 1 && (
                  <tr>
                    <td colSpan={5} className="font-medium text-lg text-right">
                      <Pagination className="mt-4 justify-end">
                        <PaginationContent className="flex justify-center items-center gap-2">
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setCurrentPageCompany((prev) =>
                                  Math.max(prev - 1, 1)
                                )
                              }
                              className={`cursor-pointer bg-primary_color rounded-lg text-white hover:bg-secondary_color_1 hover:text-white ${
                                currentPageCompany === 1 ? "hidden" : ""
                              }`}
                            />
                          </PaginationItem>
                          <span className="font-medium text-sm">
                            Page {currentPageCompany} of {totalPages}
                          </span>
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setCurrentPageCompany((prev) =>
                                  prev < totalPages ? prev + 1 : prev
                                )
                              }
                              className={`cursor-pointer bg-primary_color rounded-lg text-white hover:bg-secondary_color_1 hover:text-white ${
                                currentPageCompany === totalPages
                                  ? "hidden"
                                  : ""
                              }`}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </td>
                  </tr>
                )}
              </>
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="pt-4 font-medium text-lg text-center"
                >
                  <span className="text-gray-500">
                    Perusahaan tidak ditemukan
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
