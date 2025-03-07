"use client";

import { toast } from "@/hooks/use-toast";
import { createJobVacancySchema } from "@/lib/schemas/common";
import { rangeSalary, statusWork } from "@/lib/static";
import { editJobs } from "@/services/common";
import type { JobProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

type ModalFormEditProfileProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  jobDetail?: JobProps;
};

export function ModalFormEditJobs({
  openModal,
  setOpenModal,
  jobDetail,
}: ModalFormEditProfileProps) {
  const queryClient = useQueryClient();

  const jobId = jobDetail?.id || "";

  const editJobsMutation = useMutation({
    mutationFn: async () =>
      await editJobs({
        position_job: getValues("position_job"),
        id: jobId,
        salary_range: watch("salary_range"),
        qualification: getValues("qualification"),
        responsibilty: getValues("responsibilty"),
        status_work: watch("status_work"),
      }),
    onSuccess: async (response) => {
      // cek status dari response
      if (response.status_code === 400) {
        return toast({
          title: "Gagal mengupdate lamaran!",
          description: response.message,
          variant: "destructive",
        });
      }

      // refresh data
      await queryClient.invalidateQueries().then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1500);

        toast({
          title: "Sukses mengupdate lamaran!",
          description: "Kamu Berhasil mengupdate lamaran!",
        });
      });
    },
    onError: (data) => {
      return toast({
        title: "Gagal mengupdate lamaran!",
        description: data.message,
      });
    },
  });

  const {
    formState: { errors },
    getValues,
    setValue,
    register,
    watch,
    handleSubmit,
  } = useForm<z.infer<typeof createJobVacancySchema>>({
    resolver: zodResolver(createJobVacancySchema),
  });

  useEffect(() => {
    if (jobDetail) {
      setValue("status_work", jobDetail.status_work || ""); // Set default status_work
      setValue("salary_range", jobDetail.salary_range || ""); // Set default salary_range
    }
  }, [jobDetail, setValue]);

  async function onSubmit() {
    await editJobsMutation.mutateAsync();
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      {/* Tombol untuk membuka modal */}
      <DialogTrigger asChild>
        {/* Tombol Edit Lamaran */}
        <Image
          className="w-5 cursor-pointer"
          src="/assets/trigger-edit.svg"
          alt="Time"
          width={20}
          height={20}
        />
      </DialogTrigger>

      {/* Konten Modal */}
      <DialogContent className="max-w-md sm:max-w-2xl rounded-lg">
        <DialogTitle className="flex items-center justify-center">
          Edit Lowongan
        </DialogTitle>

        {/* form edit jobs */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2 md:space-y-4 w-full">
            {/* posisi pekerjaan */}
            <div>
              <Label htmlFor="position_job" className="text-xs md:text-base">
                Posisi Pekerjaan
              </Label>
              <Input
                {...register("position_job")}
                className="border-primary_color text-xs md:text-base"
                id="position_job"
                name="position_job"
                placeholder="Masukkan nama lengkap Anda"
                defaultValue={jobDetail?.position_job}
              />
              {errors.position_job && (
                <p className="text-red-500 text-xs md:text-sm mt-1">
                  {errors.position_job.message}
                </p>
              )}
            </div>

            {/* status pekerjaan */}
            <div>
              <Label htmlFor="status_work" className="text-xs md:text-base">
                Status Pekerjaan
              </Label>
              <Select
                onValueChange={(value) => setValue("status_work", value)}
                defaultValue={jobDetail?.status_work}
              >
                <SelectTrigger className="w-60 text-sm md:text-base">
                  <SelectValue placeholder="Pilih status pekerjaan" />
                </SelectTrigger>
                <SelectContent className="text-sm md:text-base w-auto">
                  {statusWork.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status_work && (
                <p className="text-xs md:text-sm text-red-500">
                  {errors.status_work.message}
                </p>
              )}
            </div>

            {/* range gaji */}
            <div>
              <Label htmlFor="salary_range" className="text-xs md:text-base">
                Range Gaji
              </Label>
              <Select
                onValueChange={(value) => setValue("salary_range", value)}
                defaultValue={jobDetail?.salary_range}
              >
                <SelectTrigger className="w-60 text-sm md:text-base">
                  <SelectValue placeholder="Pilih range gaji..." />
                </SelectTrigger>
                <SelectContent className="text-sm md:text-base w-auto">
                  {rangeSalary.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.salary_range && (
                <p className="text-xs md:text-sm text-red-500">
                  {errors.salary_range.message}
                </p>
              )}
            </div>

            {/* tanggung jawab */}
            <div>
              <Label htmlFor="responsibilty" className="text-xs md:text-base">
                Tanggung Jawab
              </Label>
              <Textarea
                {...register("responsibilty")}
                className="border-primary_color text-xs md:text-base"
                id="responsibilty"
                name="responsibilty"
                placeholder="Masukkan nama lengkap Anda"
                defaultValue={jobDetail?.responsibilty}
                rows={4}
              />
              {errors.responsibilty && (
                <p className="text-red-500 text-xs md:text-sm mt-1">
                  {errors.responsibilty.message}
                </p>
              )}
            </div>

            {/* persyatan */}
            <div>
              <Label htmlFor="full_name" className="text-xs md:text-base">
                Persyaratan / Kualifikasi
              </Label>
              <Textarea
                {...register("qualification")}
                className="border-primary_color text-xs md:text-base"
                id="qualification"
                name="qualification"
                placeholder="Masukkan nama lengkap Anda"
                defaultValue={jobDetail?.qualification}
                rows={4}
              />
              {errors.qualification && (
                <p className="text-red-500 text-xs md:text-sm mt-1">
                  {errors.qualification.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Button
                type="submit"
                className=" bg-secondary_color_3 text-black hover:text-white hover:bg-secondary_color_1"
                disabled={editJobsMutation.isPending}
              >
                {editJobsMutation.isPending ? (
                  <Loader className="w-6 h-6 animate-spin" /> // Icon loading
                ) : (
                  "Simpan"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
