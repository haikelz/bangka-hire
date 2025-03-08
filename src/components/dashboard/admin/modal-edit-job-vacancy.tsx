"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { editAdminJobVacancyProviderProfileSchema } from "@/lib/schemas/common";
import { editJobVacancyProviderProfileAdmin } from "@/services/admin";
import type { ProfilCompanyProps, UserProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FacebookIcon, InstagramIcon, LinkedinIcon, Loader, MailIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { citiesList, employeeRanges } from "@/lib/static";

type ModalEditJobApplicantProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  jobVacancyProvider? : ProfilCompanyProps
}

export function ModalEditJobVacancy({ openModal, setOpenModal, jobVacancyProvider }: ModalEditJobApplicantProps) {
    const queryClient = useQueryClient();
    const {
        formState: { errors },
        getValues,
        register,
        handleSubmit,
        watch,
        setValue,
      } = useForm<z.infer<typeof editAdminJobVacancyProviderProfileSchema>>({
        defaultValues: {
          full_name: jobVacancyProvider?.user?.full_name ?? "",
          company_type: jobVacancyProvider?.company_type ?? "",
          description_company:
            jobVacancyProvider?.description_company ?? "",
          street: jobVacancyProvider?.street ?? "",
          city: jobVacancyProvider?.city ?? "",
          total_employers: jobVacancyProvider?.total_employers ?? "",
        },
        resolver: zodResolver(editAdminJobVacancyProviderProfileSchema),
      });

      const editProfileMutation = useMutation({
        mutationFn: async () =>
          await editJobVacancyProviderProfileAdmin({
            user_id: jobVacancyProvider?.user_id as string,
            full_name: getValues("full_name"),
            company_type: getValues("company_type"),
            description_company: getValues("description_company"),
            city: watch("city"),
            street: getValues("street"),
            total_employers: watch("total_employers"),
          }),
        onSuccess: async (response) => {
          if (response.status_code === 400) {
            return toast({
              title: "Gagal mengupdate profile!",
              description: response.message,
              variant: "destructive",
            });
          }

          await queryClient.invalidateQueries({
            queryKey: ["jobVacancies"],
            refetchType: "all",
          });

          // close modal box
          setOpenModal(false);

          toast({
            title: "Sukses mengupdate profile!",
            description: "Kamu Berhasil mengupdate profile!",
          });
        },
        onError: (data) => {
          return toast({
            title: "Gagal mengupdate profile!",
            description: data.message,
          });
        },
      });

      async function onSubmit() {
        await editProfileMutation.mutateAsync();
      }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      {/* Konten Modal */}
      <DialogContent className="max-w-md sm:max-w-4xl rounded-lg">
        <DialogTitle className="flex items-center justify-center">
          Edit {jobVacancyProvider?.user?.full_name}
        </DialogTitle>

        {/* Form Edit Company */}
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="full_name" className="font-bold text-sm md:text-base">
              Nama Perusahaan
            </Label>
            <Input
              {...register("full_name")}
              placeholder="Beritahu nama Perusahaanmu"
            />
            {errors.full_name ? (
              <p className="text-xs md:text-sm text-red-500">
                {errors.full_name.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="company_type" className="font-bold text-sm md:text-base">
              Industri
            </Label>
            <Input
              {...register("company_type")}
              placeholder="Beritahu Bidang Industri Perusahaanmu"
            />
            {errors.company_type ? (
              <p className="text-xs md:text-sm text-red-500">
                {errors.company_type.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="description" className="font-bold text-sm md:text-base">
              Tentang Perusahaan
            </Label>
            <Textarea
              className="h-24"
              {...register("description_company")}
              placeholder="Beritahu tentang perusahaan"
            />
            {errors.description_company ? (
              <p className="text-xs md:text-sm text-red-500">
                {errors.description_company.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="total_employers" className="font-bold text-sm md:text-base">
              Total Karyawan
            </Label>
            <Select
              onValueChange={(value) => setValue("total_employers", value)}
              defaultValue={jobVacancyProvider?.total_employers}
              {...register("total_employers")}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Pilih Total Karyawan...." />
              </SelectTrigger>
              <SelectContent>
                {employeeRanges.map((item) => (
                  <SelectItem key={item.label} value={item.value}>
                    {item.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-bold text-sm md:text-base">Lokasi</Label>
            <Select
              onValueChange={(value) => setValue("city", value)}
              defaultValue={jobVacancyProvider?.city}
              {...register("city")}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Pilih Lokasi..." />
              </SelectTrigger>
              <SelectContent>
                {citiesList.map((item) => (
                  <SelectItem key={item.id} value={item.value}>
                    {item.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="street" className="font-bold text-sm md:text-base">
              Alamat
            </Label>
            <Input
              {...register("street")}
              placeholder="Beritahu Alamat Lengkap Perusahaanmu"
              required
            />
            {errors.street ? (
              <p className="text-xs md:text-sm text-red-500">
                {errors.street.message}
              </p>
            ) : null}
          </div>

          <div className="flex justify-end items-center">
              <Button type="submit" className="bg-secondary_color_1" disabled={editProfileMutation.isPending}>
                {editProfileMutation.isPending ? (
                  <Loader className="w-6 h-6 animate-spin" />
                ) : (
                  "Simpan"
                )}
              </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
