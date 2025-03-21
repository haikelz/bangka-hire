"use client";

import { toast } from "@/hooks/use-toast";
import { editProfileTentangSayaSchema } from "@/lib/schemas/common";
import { editProfile } from "@/services/common";
import type { UserProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type ModalFormTentangSayaProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  userInfo?: UserProps;
};

export function ModalFormTentangSaya({
  openModal,
  setOpenModal,
  userInfo,
}: ModalFormTentangSayaProps) {
  const queryClient = useQueryClient();

  const editProfileMutation = useMutation({
    mutationFn: async () =>
      await editProfile({
        description: getValues("description"),
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
        setTimeout(() => {
          window.location.reload();
        }, 1500);

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
  } = useForm<z.infer<typeof editProfileTentangSayaSchema>>({
    resolver: zodResolver(editProfileTentangSayaSchema),
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
          Tentang Saya
        </DialogTitle>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <div>
              <Label htmlFor="description" className="text-xs md:text-base">
                Description
              </Label>
              <Textarea
                {...register("description")}
                className="border-primary_color text-xs md:text-base"
                id="description"
                name="description"
                placeholder="Beritahu hal menarik tentang dirimu"
                defaultValue={userInfo?.description}
                rows={6}
              />
              {errors.description && (
                <p className="text-xs md:text-sm text-red-600 mt-1">
                  {errors.description.message}
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
