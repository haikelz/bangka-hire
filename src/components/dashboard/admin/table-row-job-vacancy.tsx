"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { getCompanyByUserId } from "@/services/common";
import type { UserProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DeleteIcon, Loader, User } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ModalCreateProfileJobVacancy } from "./modal-create-profile-job-vacancy";


const ModalEditJobVacancy = dynamic(() =>
  import("./modal-edit-job-vacancy").then((comp) => comp.ModalEditJobVacancy)
);

const ModalDeleteJobVacancy = dynamic(() =>
  import("./modal-delete-job-vacancy").then(
    (comp) => comp.ModalDeleteJobVacancy
  )
);

export default function TableRowJobVacancy({
  job,
  index,
}: {
  job: UserProps;
  index: number;
}) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModal, setOpenModal] = useState(false);


  const { data, isPending, isError } = useQuery({
    queryKey: ["user_id", job.id],
    queryFn: async () => {
      const isExist = await getCompanyByUserId(job.id as string);
      return isExist;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  const isProfileExist = data?.exists as boolean;

  return (
    <TableRow className="flex w-full justify-between text-xs md:text-base">
      <TableCell className="font-medium flex-[0.1]">{index + 1}</TableCell>
      <TableCell className="flex-[0.2] line-clamp-1">{job.full_name}</TableCell>
      <TableCell className="flex-[0.25] line-clamp-1">{job.email}</TableCell>
      <TableCell className="flex-[0.25]">
        <span className="text-blue-500">Active</span>
      </TableCell>
      <TableCell className="flex-[0.05]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-gray-500 hover:text-gray-700 bg-transparent text-2xl border-none shadow-none hover:bg-transparent">
              ⋮
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={-5}
            className="bg-secondary_color_2 p-1 text-xs md:text-sm"
          >
            <DropdownMenuItem
              data-state="open"
              className="!bg-transparent hover:!bg-primary_color hover:!text-white"
            >
              {isPending ?
              (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <p>Sabar Yah...</p>
                </div>
              ) :
              isProfileExist ? (
                <div
                  onClick={() => {
                    setOpenModalEdit(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <p>Edit Company</p>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setOpenModalCreate(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <p>Tambah Company</p>
                </div>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              data-state="open"
              className="cursor-pointer !bg-transparent hover:!bg-red-600 hover:!text-white"
            >
              <div
                onClick={() => {
                  setOpenModal(true);
                }}
                className="flex items-center gap-2"
              >
                <DeleteIcon className="w-4 h-4" />
                <p>Hapus Company</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <ModalEditJobVacancy
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        jobVacancyProvider={job}
      />

      <ModalCreateProfileJobVacancy
        openModal={openModalCreate}
        setOpenModal={setOpenModalCreate}
        jobVacancyProvider={job}
      />

      <ModalDeleteJobVacancy
        openModal={openModal}
        setOpenModal={setOpenModal}
        userId={job.id}
        userName={job.full_name}
      />
    </TableRow>
  );
}
