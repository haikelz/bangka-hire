"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { useCurrentUser, useCurrentUserGoogle } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useForm } from "react-hook-form";
import { editProfile } from "@/services/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserProps } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type ModalFormEditProfileProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export function ModalFormEditProfile({
  openModal,
  setOpenModal,
}: ModalFormEditProfileProps) {
  const router = useRouter();
  const { user } = useCurrentUser() as { user: UserProps };
  const userGoogle = useCurrentUserGoogle()
  const queryClient = useQueryClient();

  const editProfileMutation = useMutation({
    mutationFn: async () =>
      await editProfile({
        phone_number: getValues("phone_number"),
        full_name: getValues("full_name"),
        user_id: user.id || userGoogle?.id
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
        setTimeout(() => {
          window.location.reload();
        }, 1000);

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
  } = useForm();

  async function onSubmit() {
    await editProfileMutation.mutateAsync();
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      {/* Tombol untuk membuka modal */}
      <DialogTrigger asChild>
        {/* Tombol Kirim Lamaran */}
        <Image className="cursor-pointer w-6 h-6" src="/assets/trigger-edit.svg" alt="Kirim Lamaran" width={40} height={40} />
      </DialogTrigger>

      {/* Konten Modal */}
      <DialogContent className="max-w-sm sm:max-w-md rounded-lg">
        <DialogTitle className="flex items-center justify-center">
          {/* Gambar */}
          <Avatar className="w-32 h-32">
              {/* Gambar */}
              {user?.image ? (
                <AvatarImage src={user.image} alt="avatar" />
              ) : (
                <AvatarFallback className="bg-primary_color text-white text-2xl">
                  {user?.full_name
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
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name">Nama Lengkap</Label>
              <Input {...register("full_name")} className="border-primary_color" id="full_name" name="full_name" placeholder="Masukkan nama lengkap Anda" defaultValue={user?.full_name} />
            </div>

            <div>
              <Label htmlFor="phone_number">Whatsapp</Label>
              <Input
                {...register("phone_number")}
                className="border-primary_color"
                id="phone_number"
                name="phone_number"
                placeholder="Masukkan no handphone Anda"
                defaultValue={user?.phone_number}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-secondary_color_3 text-black hover:text-white hover:bg-secondary_color_1"
            >
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
