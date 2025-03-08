"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { editProfileInDashboardAdminSchema } from "@/lib/schemas/common";
import { editProfileJobApplicant } from "@/services/admin";
import { UserProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ModalEditJobApplicantProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  user? : UserProps;
}

export function ModalEditJobApplicant({ openModal, setOpenModal, user }: ModalEditJobApplicantProps) {
    const queryClient = useQueryClient();
    const editProfileMutation = useMutation({
      mutationFn: async () =>
        await editProfileJobApplicant({
          phone_number: getValues("phone_number"),
          full_name: getValues("full_name"),
          description: getValues("description"),
          email: getValues("email"),
          user_id: user?.id,
        }),
      onSuccess: async (response) => {
        // cek status dari response
        if (response.status_code === 400) {
          return toast({
            title: "Gagal mendaftarkan akun!",
            description: response.message,
            variant: "destructive",
          });
        }

        // refresh data
        await queryClient.invalidateQueries({
          queryKey: ["user"],
          refetchType: "all",
        });

        // Close the modal after successful deletion
        setOpenModal(false);

        toast({
          title: "Sukses mengupdate profile!",
          description: "Kamu Berhasil mengupdate profile!",
        });
      },
      onError: (data) => {
        return toast({
          title: "Gagal mengupdate akun!",
          description: data.message,
        });
      },
    });

    const {
      formState: { errors },
      getValues,
      setValue,
      register,
      handleSubmit,
      reset
    } = useForm<z.infer<typeof editProfileInDashboardAdminSchema>>({
      resolver: zodResolver(editProfileInDashboardAdminSchema)
    });


    async function onSubmit() {
      await editProfileMutation.mutateAsync();
    }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      {/* Konten Modal */}
      <DialogContent className="max-w-md sm:max-w-2xl rounded-lg">
        <DialogTitle className="flex items-center justify-center">
          Edit {user?.full_name}
        </DialogTitle>

        {/* Form Edit User */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 md:space-y-4 w-full">
          <div className="space-y-2 md:space-y-4 w-full">
            {/* Nama Lengkap */}
            <div>
              <Label htmlFor="full_name" className="text-xs md:text-base">
                Nama Lengkap
              </Label>
              <Input
                {...register("full_name")}
                className="border-primary_color text-xs md:text-base"
                id="full_name"
                name="full_name"
                defaultValue={user?.full_name}
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
                defaultValue={user?.email}
                placeholder="Masukkan nomor handphone user"
                disabled={user?.google_oauth}
              />
              {user?.google_oauth && (
                <span className="text-red-500 text-xs md:text-sm">
                  Catatan!!: Email ini tidak bisa diubah karena user login menggunakan google
                </span>
              )}
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
                {...register("phone_number") }
                className="border-primary_color text-xs md:text-base"
                id="phone_number"
                name="phone_number"
                defaultValue={user?.phone_number}
                placeholder="Masukkan nomor handphone user"
              />
              {errors.phone_number && (
                <span className="text-red-500 text-xs md:text-sm">
                  {errors.phone_number.message}
                </span>
              )}
            </div>

            {/* tanggung jawab */}
            <div>
              <Label htmlFor="description" className="text-xs md:text-base">
                Deskripsi
              </Label>
              <Textarea
                {...register("description")}
                className="border-primary_color text-xs md:text-base"
                id="description"
                name="description"
                defaultValue={user?.description}
                placeholder="Deskripsi singkat tentang si User ini"
                rows={4}
              />
            </div>

            <div className="flex items-center justify-end">
              <Button
                type="submit"
                className=" bg-secondary_color_3 text-black hover:text-white hover:bg-secondary_color_1"
                disabled={editProfileMutation.isPending}
              >
                {editProfileMutation.isPending ? (
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
