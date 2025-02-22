"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { useCurrentUser, useCurrentUserGoogle } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { UserProps } from "@/types";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfile } from "@/services/common";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

type ModalFormTentangSayaProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export function ModalFormTentangSaya({
  openModal,
  setOpenModal,
}: ModalFormTentangSayaProps) {
  const router = useRouter();
  const { user } = useCurrentUser() as { user: UserProps };
  const userGoogle = useCurrentUserGoogle()
  const queryClient = useQueryClient();

  const editProfileMutation = useMutation({
    mutationFn: async () =>
      await editProfile({
        description: getValues("description"),
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
          Tentang Saya
        </DialogTitle>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea {...register("description")} className="border-primary_color" id="description" name="description" placeholder="Beritahu hal menarik tentang dirimu" defaultValue={user?.description} rows={6} />
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
