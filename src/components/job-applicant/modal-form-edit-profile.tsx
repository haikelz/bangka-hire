"use client";

import { toast } from "@/hooks/use-toast";
import { editProfileSchema } from "@/lib/schemas/common";
import { editProfile } from "@/services/common";
import { UserProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type ModalFormEditProfileProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  userInfo?: UserProps;
};

export function ModalFormEditProfile({
  openModal,
  setOpenModal,
  userInfo,
}: ModalFormEditProfileProps) {
  const queryClient = useQueryClient();

  const editProfileMutation = useMutation({
    mutationFn: async () =>
      await editProfile({
        phone_number: getValues("phone_number"),
        full_name: getValues("full_name"),
        user_id: userInfo?.id,
        google_oauth: userInfo?.google_oauth,
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

      await queryClient.invalidateQueries().then(() => {
        toast({
          title: "Sukses mengupdate profile!",
          description: "Kamu Berhasil mengupdate profile!",
        });
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
    register,
    handleSubmit,
  } = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
  });

  async function onSubmit() {
    await editProfileMutation.mutateAsync();
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      {/* Tombol untuk membuka modal */}
      <DialogTrigger asChild>
        {/* Tombol Kirim Lamaran */}
        <Image
          className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
          src="/assets/trigger-edit.svg"
          alt="Kirim Lamaran"
          width={40}
          height={40}
        />
      </DialogTrigger>

      {/* Konten Modal */}
      <DialogContent className="max-w-sm sm:max-w-md rounded-lg">
        <DialogTitle className="flex items-center justify-center">
          {/* Gambar */}
          <Avatar className="w-24 h-24 md:w-32 md:h-32">
            {/* Gambar */}
            {userInfo?.image ? (
              <AvatarImage src={userInfo?.image} alt="avatar" referrerPolicy="no-referrer" />
            ) : (
              <AvatarFallback className="bg-primary_color text-white text-2xl">
                {userInfo?.full_name
                  ?.split(" ")
                  .map((name: string) => name[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            )}
          </Avatar>
        </DialogTitle>

        {/* form edit profile */}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2 md:space-y-4">
            <div>
              <Label htmlFor="full_name" className="text-xs md:text-base">
                Nama Lengkap
              </Label>
              <Input
                {...register("full_name")}
                className="border-primary_color text-xs md:text-base"
                id="full_name"
                name="full_name"
                placeholder="Masukkan nama lengkap Anda"
                defaultValue={userInfo?.full_name}
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs md:text-sm mt-1">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone_number" className="text-xs md:text-base">
                Whatsapp
              </Label>
              <Input
                {...register("phone_number")}
                className="border-primary_color text-xs md:text-base"
                id="phone_number"
                name="phone_number"
                placeholder="Masukkan no handphone Anda"
                defaultValue={userInfo?.phone_number}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-xs md:text-sm mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-secondary_color_3 text-black hover:text-white hover:bg-secondary_color_1"
              disabled={editProfileMutation.isPending}
            >
              {editProfileMutation.isPending ? (
                <Loader className="w-6 h-6 animate-spin" /> // Icon loading
              ) : (
                "Simpan"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
