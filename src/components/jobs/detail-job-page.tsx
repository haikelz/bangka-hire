"use client";

import { calculateAverageRating } from "@/lib/number";
import { getJobById } from "@/services/common";
import { type CommentProps, type JobProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Eye, Star } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import triggerDetail from "../../../public/assets/detail-trigger.png";
import location from "../../../public/assets/location.svg";
import logo from "../../../public/assets/logo.png";
import salary from "../../../public/assets/salary-detail.svg";
import status from "../../../public/assets/status.svg";
import { formatRupiah } from "../../lib/currency";
import Layout from "../common/container";
import { IsErrorClient } from "../react-query/is-error-client";
import { IsPendingClient } from "../react-query/is-pending-client";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type DetailJobPageProps = {
  job_id: string;
};

const ModalFormJobApply = dynamic(() =>
  import("../job-applicant/modal-form-job-apply").then(
    (comp) => comp.ModalFormJobApply
  )
);

export default function DetailJobPage({ job_id }: DetailJobPageProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data, isPending, isError } = useQuery({
    queryKey: ["detail-job", job_id],
    queryFn: async () => {
      // di cek dulu apakah job id sudah ada
      if (!job_id) return null;
      return await getJobById(job_id);
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // kalau pending
  if (isPending) return <IsPendingClient className="min-h-svh mt-6" />;
  if (isError) return <IsErrorClient />;

  const job = data?.data as JobProps;

  return (
    <Layout className="mt-6">
      {/* informasi pekerjaan singkat */}
      <div className="bg-secondary_color_2 p-2 md:p-6 rounded-md space-y-4 md:space-y-7">
        {/* logo, nama perusahaan, rating, ulasan,button detail */}
        <div className="flex justify-between items-center">
          {/* logo dan nama perusahaan, rating dan ulasan */}
          <div className="flex items-center gap-5">
            {/* logo perusahaan */}
            {job.company?.user?.image ? (
              <Image
                className="w-16 sm:w-20 md:w-32"
                src={job.company?.user.image}
                alt="Logo"
                width={500}
                height={500}
              />
            ) : (
              <Image
                className="w-16 sm:w-20 md:w-32"
                width={500}
                height={500}
                src={logo}
                alt="Logo"
              />
            )}
            {/* posisi pekerjaan */}
            <div>
              <h1 className="font-bold sm:text-xl lg:text-2xl">
                {job.position_job}
              </h1>
              <div className="flex items-center gap-3 font-medium text-xs sm:text-base">
                <p>{job.company?.user?.full_name}</p>
                {/* rating */}
                <div className="flex items-center">
                  <Rating job={job} />
                  <Star fill="#2A72B3" stroke="none" />
                </div>

                <p className="underline">
                  {job.company?.comments?.length} ulasan
                </p>
              </div>
            </div>
          </div>

          {/* button detail perusahaan */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Image src={triggerDetail} alt="Actions" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-secondary_color_2">
              <DropdownMenuItem>
                <Link
                  href={`/job-vacancy-providers/${job.company_id}`}
                  className="flex items-center gap-2"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Lihat Detail Perusahaan
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* informasi singkat pekerjaan */}
        <div className="flex justify-between items-center lg:gap-10 text-[9px] sm:text-sm lg:text-lg">
          {/* status pekerjaaan */}
          <div className="bg-secondary_color_3 p-1 sm:p-2 md:p-3 lg:p-4 lg:w-1/3 rounded md:rounded-md flex items-center gap-1 sm:gap-3">
            <Image className="w-3 sm:w-8 lg:w-12" src={status} alt="Status" />
            <div>
              <p>Status Pekerjaan</p>
              <p className="font-medium">{job.status_work}</p>
            </div>
          </div>
          {/* salary */}
          <div className="bg-secondary_color_3 p-1 sm:p-2 md:p-3 lg:p-4 lg:w-1/3 rounded md:rounded-md flex items-center gap-1 sm:gap-3">
            <Image className="w-3 sm:w-8 lg:w-12" src={salary} alt="Status" />
            <div>
              <p>Gaji</p>
              {job.salary_min && job.salary_max
                ? `${formatRupiah(job.salary_min)} - ${formatRupiah(
                    job.salary_max
                  )}`
                : job.salary_min && !job.salary_max
                ? `>${formatRupiah(job.salary_min)}`
                : job.salary_max && !job.salary_min
                ? `<${formatRupiah(job.salary_max)}`
                : "Negotiable"}
            </div>
          </div>
          {/* location */}
          <div className="bg-secondary_color_3 p-1 sm:p-2 md:p-3 lg:p-4 lg:w-1/3 rounded md:rounded-md flex items-center gap-1 sm:gap-3">
            <Image className="w-3 sm:w-8 lg:w-12" src={location} alt="Status" />
            <div>
              <p>Lokasi</p>
              <p className="font-medium">{job.company?.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* detail pekerjaan lengkap */}
      <div className="mt-10 space-y-5 text-xs sm:text-sm lg:space-y-10 md:text-base">
        {/* Deskripsi Perusahaan */}
        <div className="space-y-5">
          <h1 className="font-bold">Deskripsi Perusahaan</h1>
          <p>{job.company?.description_company}</p>
        </div>

        {/* Line */}
        <div className="w-full h-[1px] bg-primary_color"></div>

        {/* Tanggung Jawab */}
        <div className="space-y-5">
          <h1 className="font-bold">Tanggung Jawab</h1>
          <ul className="list-disc pl-5">
            <li>{job.responsibilty}</li>
          </ul>
        </div>

        {/* Kualifikasi */}
        <div className="space-y-5">
          <h1 className="font-bold">Kualifikasi</h1>
          <ul className="list-disc pl-5">
            <li>{job.qualification}</li>
          </ul>
        </div>

        {/* modal form kirm lamaran */}
        <ModalFormJobApply
          openModal={openModal}
          setOpenModal={setOpenModal}
          job_id={job_id}
        />
      </div>
    </Layout>
  );
}

function Rating({ job }: { job: JobProps }) {
  // mencari jumlah rata rata rating
  const averageRating = useMemo(
    () =>
      calculateAverageRating(
        job?.company?.comments as CommentProps[],
        (comment: any) => comment.rating
      ),
    [job, calculateAverageRating]
  );

  return <p>{averageRating}</p>;
}
