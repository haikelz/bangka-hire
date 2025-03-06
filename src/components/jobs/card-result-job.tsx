"use client";

import { formatTanggal } from "@/lib/date";
import { JobProps } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import location from "../../../public/assets/location.png";
import logo from "../../../public/assets/logo.png";
import salary from "../../../public/assets/salary.png";
import status from "../../../public/assets/status-work.png";
import time from "../../../public/assets/time.png";
import { formatRupiah } from "../../lib/currency";

const ModalDeleteJobs = dynamic(() =>
  import("../dashboard/modal-delete-jobs").then((comp) => comp.ModalDeleteJobs)
);
const ModalFormEditJobs = dynamic(() =>
  import("../dashboard/modal-form-edit-jobs").then(
    (comp) => comp.ModalFormEditJobs
  )
);

export default function CardResultJob({ data }: { data: JobProps }) {
  const pathname = usePathname();

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  return (
    <div className="shadow-2xl bg-white rounded-lg p-3 border border-primary_color">
      <Link href={`/jobs/${data.id}`}>
        {/* Logo company */}
        <Image className="w-16 md:w-24" src={logo} alt="Logo" />
        {/* informasi singkat dari nama perusahaan, posisi, gaji, dll */}
        <div className="text-black mt-1 space-y-2">
          <div className="text-primary_color">
            <h3 className="text-xl md:text-2xl font-bold line-clamp-1">
              {data.company.user?.full_name}
            </h3>
            <p className="text-base md:text-lg font-medium line-clamp-1">
              {data.position_job}
            </p>
          </div>

          {/* Informasi lokasi perusahaan dan gaji dan status pekerjaan */}
          <div className="font-medium text-xs md:text-sm space-y-2">
            {/* location */}
            <div className="flex items-center gap-2">
              <Image className="w-4" src={location} alt="Location" />
              <p>{data.company.city}, Bangka Belitung</p>
            </div>

            {/* salary */}
            <div className="flex items-center gap-2">
              <Image className="w-4" src={salary} alt="Salary" />
              <p>
                {" "}
                {data.salary_min && data.salary_max
                  ? `${formatRupiah(data.salary_min)} - ${formatRupiah(
                      data.salary_max
                    )}`
                  : data.salary_min && !data.salary_max
                  ? `>${formatRupiah(data.salary_min)}`
                  : data.salary_max && !data.salary_min
                  ? `<${formatRupiah(data.salary_max)}`
                  : "Negotiable"}
              </p>
            </div>

            {/* status work */}
            <div className="flex items-center gap-2">
              <Image className="w-4" src={status} alt="Status" />
              <p>{data.status_work}</p>
            </div>
          </div>

          {/* Garis pemisah */}
          <div className="w-full h-[2px] bg-primary_color"></div>
        </div>
      </Link>
      {/* waktu posting */}
      <div className="flex justify-between items-center text-sm sm:text-sm mt-2 cursor-default">
        <div className="flex items-center gap-2">
          <Image className="w-4" src={time} alt="Time" />
          <p>Di posting {formatTanggal(data.createdAt)}</p>
        </div>

        {/* tombol edit dan  hapus khusus di dashboard job vacancy provider */}
        {pathname === "/dashboard" && (
          <>
            <div className="flex items-center gap-1">
              <ModalFormEditJobs
                openModal={openModalEdit}
                setOpenModal={setOpenModalEdit}
                jobDetail={data}
              />
              <ModalDeleteJobs
                openModal={openModalDelete}
                setOpenModal={setOpenModalDelete}
                jobId={data.id}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
