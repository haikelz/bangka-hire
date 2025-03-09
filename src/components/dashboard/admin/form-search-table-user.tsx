"use client";

import { IsErrorClient } from "@/components/react-query/is-error-client";
import { IsPendingClient } from "@/components/react-query/is-pending-client";
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
import { getAllUser } from "@/services/common";
import type { UserProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ModalCreateJobApplicant } from "./modal-create-job-applicant";
import TableRowUser from "./table-row-user";

const ModalDeleteJobApplicant = dynamic(() =>
  import("./modal-delete-job-applicant").then(
    (comp) => comp.ModalDeleteJobApplicant
  )
);

const ModalEditJobApplicant = dynamic(() =>
  import("./modal-edit-job-applicant").then(
    (comp) => comp.ModalEditJobApplicant
  )
);

export default function FormSearchAndTableUser() {
  const [valueSearch, setValueSearchUser] = useState<string>("");
  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  // prefetch data user

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setValueSearchUser(formData.get("search-user") as string);
  }

  const { data, isPending, isError } = useQuery({
    queryKey: ["user", valueSearch, currentPageUser],
    queryFn: async () => {
      return await getAllUser(currentPageUser, 10, valueSearch);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isError) return <IsErrorClient />;

  const users = data?.data as UserProps[];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="bg-secondary_color_2 rounded-lg p-6 space-y-3">
      {/* judul dan search user */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-base md:text-lg">User List</h1>
        <form onSubmit={handleSubmit} className="w-1/2 md:w-1/3">
          <div className="relative">
            <Input
              placeholder="Search User"
              name="search-user"
              id="search-user"
              className=" border-primary_color pl-8 md:pl-10 text-xs md:text-base"
            />
            <SearchIcon className="w-5 h-5 absolute top-1/2 left-2 -translate-y-1/2 text-black" />
          </div>
        </form>
      </div>

      {/* modal create user */}
      <div className="flex justify-end">
        <ModalCreateJobApplicant
          openModal={openModalCreate}
          setOpenModal={setOpenModalCreate}
        />
      </div>

      {/* tabel nama,no,email */}
      <Table>
        <TableHeader>
          <TableRow className="flex w-full justify-between text-sm md:text-base">
            <TableHead className="flex-[0.1]">No</TableHead>
            <TableHead className="flex-[0.2]">Nama</TableHead>
            <TableHead className="flex-[0.25]">Email</TableHead>
            <TableHead className="flex-[0.25]">Status</TableHead>
            <TableHead className="flex-[0.05]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={5}>
                <IsPendingClient className="my-1 h-40 w-full" />
              </TableCell>
            </TableRow>
          ) : users && users.length ? (
            <>
              {users.map((user, index: number) => (
                <TableRowUser key={user.id} user={user} index={index} />
              ))}
              {/* pagination */}
              {data?.totalItems > 10 && totalPages > 1 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Pagination className="mt-4 justify-end">
                      <PaginationContent className="flex justify-center items-center gap-2">
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setCurrentPageUser((prev) =>
                                Math.max(prev - 1, 1)
                              )
                            }
                            className={`cursor-pointer bg-primary_color rounded-lg text-white hover:bg-secondary_color_1 hover:text-white ${
                              currentPageUser === 1 ? "hidden" : ""
                            }`}
                          />
                        </PaginationItem>
                        <span className="font-medium text-sm">
                          Page {currentPageUser} of {totalPages}
                        </span>
                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setCurrentPageUser((prev) =>
                                prev < totalPages ? prev + 1 : prev
                              )
                            }
                            className={`cursor-pointer bg-primary_color rounded-lg text-white hover:bg-secondary_color_1 hover:text-white ${
                              currentPageUser === totalPages ? "hidden" : ""
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
                <span className="text-gray-500">User tidak ditemukan</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
