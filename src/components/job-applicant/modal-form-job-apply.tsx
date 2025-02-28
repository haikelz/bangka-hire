"use client";

import { useGetUserServer } from "@/hooks/use-current-user";
import { toast } from "@/hooks/use-toast";
import { applyJobSchema } from "@/lib/schemas/common";
import { createApplyJob, getUserOnJobs } from "@/services/common";
import { UserProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, LockIcon, VerifiedIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import kirim from "../../../public/assets/kirim-lamaran-icon.svg";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type ModalFormJobApplyProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  job_id?: string;
};

export function ModalFormJobApply({
  openModal,
  setOpenModal,
  job_id,
}: ModalFormJobApplyProps) {
  const { user }: { user: UserProps } = useGetUserServer();
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // mengambil data user on jobs untuk mengecek jika user sudah lamar atau belum
  const { data, isPending, isError } = useQuery({
    queryKey: ["user-on-jobs", user?.id, job_id],
    queryFn: async () => {
      // di cek dulu apakah user id dan job id sudah ada
      if (!user?.id || !job_id) return null;
      return await getUserOnJobs(user?.id, job_id);
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // use form
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof applyJobSchema>>({
    resolver: zodResolver(applyJobSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Ambil file pertama yang di-upload
    if (file) {
      setFileName(file.name);
      setValue("cv", file); // Masukkan file ke dalam useForm
    }
  };

  const handleRemoveFile = () => {
    if (fileName) {
      setFileName(null);
      setValue("cv", null);
    }

    if (fileInputRef.current) {
      const inputElement = fileInputRef.current;
      inputElement.value = ""; // Reset input file
    }
  };

  // logic untuk apply job
  const queryClient = useQueryClient();

  const applyJobMutation = useMutation({
    mutationFn: async () =>
      await createApplyJob({
        user_id: user?.id,
        job_id: job_id,
        cv: fileName || "",
      }),
    onSuccess: async (response) => {
      // cek status dari response
      if (response.status_code === 400) {
        return toast({
          title: "Gagal mengirim lamaran!",
          description: response.message,
          variant: "destructive",
        });
      }

      await queryClient.invalidateQueries().then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        toast({
          title: "Sukses mengirim lamaran!",
          description: "Kamu Berhasil mengirim lamaran ke perusahaan!",
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

  // handleSubmit
  async function onSubmit() {
    await applyJobMutation.mutateAsync();
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      {/* Tombol untuk membuka modal */}
      <DialogTrigger asChild>
        {/* Tombol Kirim Lamaran */}
        {user?.role === "job_applicant" ? (
          <Button
            className="bg-secondary_color_3 text-black px-12 hover:bg-secondary_color_1 hover:text-white"
            disabled={data?.exists}
          >
            {/* pengecekan bila user sudah kirim lamaran */}
            {isPending ? (
              <div>
                <Loader className="animate-spin" />
              </div>
            ) : data?.exists ? (
              <div className="flex items-center gap-2">
                <VerifiedIcon color="black" width={20} height={20} />
                <p className="font-medium">Kamu sudah kirim lamaran</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Image className="invert" src={kirim} alt="Kirim Lamaran" />
                <p className="font-medium">Kirim Lamaran</p>
              </div>
            )}
          </Button>
        ) : user?.role === "job_vacancy_provider" || user?.role === "admin" ? (
          <Button
            className="bg-secondary_color_3 text-black px-12 hover:bg-secondary_color_1 hover:text-white"
            disabled
          >
            <div className="flex items-center gap-2">
              <LockIcon color="black" width={20} height={20} />
              <p className="font-medium">Tidak Memiliki Akses Kirim Lamaran</p>
            </div>
          </Button>
        ) : !user ? (
          <Button
            className="bg-secondary_color_3 text-black px-12 hover:bg-secondary_color_1 hover:text-white"
            disabled
          >
            <div className="flex items-center gap-2">
              <p className="font-medium">Login Untuk Akses</p>
            </div>
          </Button>
        ) : null}
      </DialogTrigger>

      {/* Konten Modal */}
      <DialogContent className="max-w-sm sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Form Lamaran</DialogTitle>
        </DialogHeader>

        {/* Form Lamaran */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name" className="text-xs md:text-sm">
                Nama Lengkap
              </Label>
              <Input
                id="full_name"
                name="full_name"
                className="text-xs md:text-sm"
                placeholder="Masukkan nama lengkap Anda"
                value={user?.full_name}
                disabled
              />
            </div>

            <div>
              <Label htmlFor="phone_number" className="text-xs md:text-sm">
                No Handphone
              </Label>
              <Input
                id="phone_number"
                name="phone_number"
                className="text-xs md:text-sm"
                placeholder="Masukkan no handphone Anda"
                value={user?.phone_number}
                disabled
              />
            </div>

            <div>
              <div className="flex gap-2 items-center">
                <Label
                  htmlFor="cv"
                  className="bg-secondary_color_3 w-1/3 text-xs md:text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary_color_1 duration-300 ease-in-out hover:text-white text-center"
                >
                  Upload CV
                </Label>
                <Input
                  {...register("cv")}
                  type="file"
                  accept=".pdf"
                  id="cv"
                  className="hidden"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                {/* Tampilkan nama file yang dipilih */}
                {fileName && (
                  <div className="flex items-center gap-2 bg-gray-100 px-2 rounded-lg">
                    <p className="text-xs line-clamp-1 md:text-sm text-gray-700">
                      {fileName}
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveFile}
                    >
                      <X className="w-4 h-4 text-red-500 hover:text-red-700" />
                    </Button>
                  </div>
                )}
              </div>
              {errors.cv && (
                <p className="text-xs md:text-sm text-red-500">
                  {errors.cv?.message?.toString()}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-secondary_color_3 text-black hover:text-white hover:bg-secondary_color_1"
            >
              {applyJobMutation.isPending ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                "Kirim"
              )}
            </Button>
            <p className="text-[8px] sm:text-[10px] font-bold">
              Note: Jika ingin merubah nama dan no hp, silahkan masuk menu{" "}
              <Link
                href="/profile"
                className="text-primary_color underline uppercase"
              >
                edit profile
              </Link>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
