"use client";

import { IsErrorClient } from "@/components/react-query/is-error-client";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getJobVacancyProviders } from "@/services/common";
import { ProfilCompanyProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export default function FormSearchAndTableCompany() {
  const [currentPageCompany, setCurrentPageCompany] = useState(1);
  const [valueCompany, setValueCompany] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setValueCompany(formData.get("search-company") as string);
  }

  const { data, isPending, isError } = useQuery({
    queryKey: ["jobVacancies", valueCompany, currentPageCompany],
    queryFn: async () => {
      return await getJobVacancyProviders(currentPageCompany, 10, valueCompany);
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isError) return <IsErrorClient />;

  const jobVacancies = data?.data.data as ProfilCompanyProps[];
  const totalPages = data?.data.totalPages ?? 1;

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <IsPendingClient className="my-1 h-40 w-full" />
                </TableCell>
              </TableRow>
            ) : jobVacancies && jobVacancies.length ? (
              <>
                {jobVacancies.map((job, index: number) => (
                  <TableRow key={job.id}>
                    <TableCell className="">{index + 1}</TableCell>
                    <TableCell className="">{job.user?.full_name}</TableCell>
                    <TableCell>{job.gmail}</TableCell>
                    <TableCell>
                      <span className="text-blue-500">Active</span>
                    </TableCell>
                    <TableCell>
                      <Button className="text-gray-500 hover:text-gray-700 bg-transparent text-2xl border-none shadow-none hover:bg-transparent">
                        ⋮
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {data?.data?.totalItems > 10 && totalPages > 1 && (
                  <TableRow>
                    <TableCell colSpan={5}>
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
                    </TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="pt-4 font-medium text-lg text-center"
                >
                  <span className="text-gray-500">
                    Perusahaan tidak ditemukan
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
