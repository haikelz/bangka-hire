"use client";

import { Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import triggerDetail from "../../../public/assets/detail-trigger.png";
import location from "../../../public/assets/location.svg";
import logo from "../../../public/assets/logo.png";
import salary from "../../../public/assets/salary-detail.svg";
import status from "../../../public/assets/status.svg";
import Layout from "../container";
import ModalFormJobApply from "../modal-form-job-apply";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type DetailJobPageProps = {
  id: string;
};

export default function DetailJobPage({ id }: DetailJobPageProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Layout>
      {/* informasi pekerjaan singkat */}
      <div className="bg-secondary_color_2 p-2 md:p-6 rounded-md space-y-4 md:space-y-7">
        {/* logo, nama perusahaan, rating, ulasan,button detail */}
        <div className="flex justify-between items-center">
          {/* logo dan nama perusahaan, rating dan ulasan */}
          <div className="flex items-center gap-5">
            <Image className="w-16 sm:w-20 md:w-32" src={logo} alt="Logo" />
            {/* posisi pekerjaan */}
            <div>
              <h1 className="font-bold sm:text-xl lg:text-2xl">
                Customer Service
              </h1>
              <div className="flex items-center gap-3 font-medium text-xs sm:text-base">
                <p>PT. BabelHire</p>
                {/* rating */}
                <div className="flex items-center">
                  <p>4</p>
                  <Star fill="#2A72B3" stroke="none" />
                </div>

                <p className="underline">8 ulasan</p>
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
                  href={"/job-vacancy-providers/"}
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
              <p className="font-medium">Full Time</p>
            </div>
          </div>
          {/* salary */}
          <div className="bg-secondary_color_3 p-1 sm:p-2 md:p-3 lg:p-4 lg:w-1/3 rounded md:rounded-md flex items-center gap-1 sm:gap-3">
            <Image className="w-3 sm:w-8 lg:w-12" src={salary} alt="Status" />
            <div>
              <p>Gaji</p>
              <p className="font-medium">2.000.000 - 3.000.000</p>
            </div>
          </div>
          {/* location */}
          <div className="bg-secondary_color_3 p-1 sm:p-2 md:p-3 lg:p-4 lg:w-1/3 rounded md:rounded-md flex items-center gap-1 sm:gap-3">
            <Image className="w-3 sm:w-8 lg:w-12" src={location} alt="Status" />
            <div>
              <p>Lokasi</p>
              <p className="font-medium">Pangkal Pinang</p>
            </div>
          </div>
        </div>
      </div>

      {/* detail pekerjaan lengkap */}
      <div className="mt-10 space-y-5 text-xs sm:text-sm lg:space-y-10 md:text-base">
        {/* Deskripsi Perusahaan */}
        <div className="space-y-5">
          <h1 className="font-bold">Deskripsi Perusahaan</h1>
          <p>
            Bangka Hire adalah Perusahaan yang bergerak di bidang web dan
            teknologi. saat ini sedang membutuhkan UI/UX Desainer sebagai
            pendukung tim dibidang web dan teknologi Lorem ipsum dolor sit amet
            consectetur. Donec porta sem netus diam fermentum porta amet elit.
            Adipiscing elementum suspendisse pulvinar enim proin ornare
            fringilla ullamcorper adipiscing.
          </p>
        </div>

        {/* Line */}
        <div className="w-full h-[1px] bg-primary_color"></div>

        {/* Tanggung Jawab */}
        <div className="space-y-5">
          <h1 className="font-bold">Tanggung Jawab</h1>
          <ul className="list-disc pl-5">
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
          </ul>
        </div>

        {/* Kualifikasi */}
        <div className="space-y-5">
          <h1 className="font-bold">Kualifikasi</h1>
          <ul className="list-disc pl-5">
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
          </ul>
        </div>

        {/* modal form kirm lamaran */}
        <ModalFormJobApply openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </Layout>
  );
}
