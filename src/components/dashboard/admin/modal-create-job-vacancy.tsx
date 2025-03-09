"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { signUpSchema } from "@/lib/schemas/auth-schema";
import { createUserAdmin } from "@/services/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ModalCreateJobVacancyProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export function ModalCreateJobVacancy({ openModal, setOpenModal }: ModalCreateJobVacancyProps) {

  const queryClient = useQueryClient();

  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<z.infer <typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const createJobVacancyMutation = useMutation({
    mutationFn: async () =>
      await createUserAdmin({
        full_name: getValues("full_name"),
        email: getValues("email"),
        phone_number: getValues("phone_number"),
        password: getValues("password"),
        confirm_password: getValues("confirm_password"),
        role: "job_vacancy_provider",
      }),
    onSuccess: async (response) => {
      if(response.status_code === 400) {
        return toast({
          title: "Gagal mendaftarkan akun!",
          description: response.message,
          variant: "destructive",
        });
      }

      // Update cache data secara langsung
      queryClient.setQueryData(["user"], (oldData : any) => {
        // Asumsikan oldData adalah array user
        if (Array.isArray(oldData)) {
          // Tambahkan user baru ke dalam array data
          return [...oldData, response.data];
        }

        // Jika strukturnya berbeda (misalnya pagination), sesuaikan di sini
        // Contoh untuk struktur pagination:
        if (oldData && typeof oldData === 'object' && 'data' in oldData) {
          return {
            ...oldData,
            data: [...oldData.data, response.data]
          };
        }

        return oldData;
      });

      // refresh data
      await queryClient.invalidateQueries({
        queryKey: ["jobVacancies"],
        refetchType: "all",
      });

      // Close the modal after successful deletion
      setOpenModal(false);

      toast({
        title: "Sukses mendaftarkan akun!",
        description: "Kamu Berhasil membuat akun baru!",
        variant: "default",
      });
    },
    onError: (data) => {
      return toast({
        title: "Gagal mendaftarkan akun!",
        description: data.message,
      });
    },
  })


  const onSubmit = async () => {
    await createJobVacancyMutation.mutateAsync()
  }



  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
          <Button className="bg-primary_color text-white hover:bg-secondary_color_1">
            + Tambah Perusahaan
          </Button>
      </DialogTrigger>
      {/* Konten Modal */}
      <DialogContent className="max-w-md sm:max-w-2xl rounded-lg">
        <DialogTitle className="flex items-center justify-center">
          Tambah Perusahaan
        </DialogTitle>
        {/* Form Edit User */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 md:space-y-4 w-full"
        >
          <div className="space-y-2 md:space-y-4 w-full">
            {/* Nama Lengkap */}
            <div>
              <Label htmlFor="full_name" className="text-xs md:text-base">
                Nama Perusahaan/Toko
              </Label>
              <Input
                {...register("full_name")}
                className="border-primary_color text-xs md:text-base"
                id="full_name"
                name="full_name"
                placeholder="Masukkan nomor handphone user"
              />
              {errors.full_name && (
                <span className="text-red-500 text-xs md:text-sm">
                  {errors.full_name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-xs md:text-base">
                Email
              </Label>
              <Input
                {...register("email")}
                className="border-primary_color text-xs md:text-base"
                id="email"
                name="email"
                placeholder="Masukkan nomor handphone user"
              />
              {errors.email && (
                <span className="text-red-500 text-xs md:text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* No HP */}
            <div>
              <Label htmlFor="phone_number" className="text-xs md:text-base">
                No Handphone
              </Label>
              <Input
                {...register("phone_number")}
                className="border-primary_color text-xs md:text-base"
                id="phone_number"
                name="phone_number"
                placeholder="Masukkan nomor handphone user"
              />
              {errors.phone_number && (
                <span className="text-red-500 text-xs md:text-sm">
                  {errors.phone_number.message}
                </span>
              )}
            </div>

             {/* Password */}
             <div>
              <Label htmlFor="password" className="text-xs md:text-base">
                Password
              </Label>
              <Input
                {...register("password")}
                className="border-primary_color text-xs md:text-base"
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan password user"
              />
              {errors.password && (
                <span className="text-red-500 text-xs md:text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

             {/* No HP */}
             <div>
              <Label htmlFor="confirm_password" className="text-xs md:text-base">
                Konfirmasi Password
              </Label>
              <Input
                {...register("confirm_password")}
                className="border-primary_color text-xs md:text-base"
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Masukkan Konfirmasi Password user"
              />
              {errors.confirm_password && (
                <span className="text-red-500 text-xs md:text-sm">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Button
                type="submit"
                className=" bg-secondary_color_3 text-black hover:text-white hover:bg-secondary_color_1"
                disabled={createJobVacancyMutation.isPending}
              >
                {createJobVacancyMutation.isPending ? (
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
)
}
