"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import type { UserProps } from "@/types";
import { DeleteIcon, User } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const ModalEditJobApplicant = dynamic(() =>
  import("./modal-edit-job-applicant").then(
    (comp) => comp.ModalEditJobApplicant
  ));

const ModalDeleteJobApplicant = dynamic(() =>
  import("./modal-delete-job-applicant").then(
    (comp) => comp.ModalDeleteJobApplicant
  ));

export default function TableRowUser({ user, index }: { user: UserProps, index: number }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <TableRow key={user.id} className="flex w-full justify-between text-xs md:text-base">
      <TableCell className="font-medium flex-[0.1]">{index + 1}</TableCell>
      <TableCell className="flex-[0.2] line-clamp-1">{user.full_name}</TableCell>
      <TableCell className="flex-[0.25] line-clamp-1">{user.email}</TableCell>
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
              className="!bg-transparent hover:!bg-primary_color hover:!text-white">
              <div
                  onClick={() => {
                    setOpenModalEdit(true);
                  }}
                  className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <p>Edit User</p>
              </div>

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
                <p>Hapus User</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      <ModalEditJobApplicant openModal={openModalEdit} setOpenModal={setOpenModalEdit} user={user} />
      <ModalDeleteJobApplicant openModal={openModal} setOpenModal={setOpenModal} userId={user.id} userName={user.full_name} />
    </TableRow>
  )
}
