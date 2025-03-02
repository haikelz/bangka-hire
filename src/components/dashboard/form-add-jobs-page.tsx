"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetUserServer } from "@/hooks/use-current-user";
import { toast } from "@/hooks/use-toast";
import { createJobVacancySchema } from "@/lib/schemas/common";
import { rangeSalary, statusWork } from "@/lib/static";
import { createJob, getCompanyByUserId } from "@/services/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IsPendingClient } from "../react-query/is-pending-client";

export default function FormAddJobs() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof createJobVacancySchema>>({
    resolver: zodResolver(createJobVacancySchema),
  });
  const router = useRouter();
  const { user } = useGetUserServer();

  const companyId = user?.profile?.id;
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  // mengambil nilai true false apakah user sudah memiliki profile
  const { data, isPending, isError } = useQuery({
    queryKey: ["already-create-profile", user?.id],
    queryFn: async () => {
      // di cek dulu apakah userID sudah ada atau belum
      if (!user?.id) return null;
      return await getCompanyByUserId(user?.id);
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  // Menggunakan useEffect untuk menandai data telah dimuat setelah query selesai
  useEffect(() => {
    if (!isPending && data !== undefined) {
      setIsDataLoaded(true);
    }
  }, [isPending, data]);

  const queryClient = useQueryClient();

  const addJobMutation = useMutation({
    mutationFn: async () =>
      await createJob({
        position_job: getValues("position_job"),
        company_id: companyId,
        salary_range: watch("salary_range"),
        qualification: getValues("qualification"),
        responsibilty: getValues("responsibilty"),
        status_work: watch("status_work"),
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
          router.push("/dashboard");
        }, 1000);

        toast({
          title: "Sukses Membuat Lowongan Kerja!",
          description: "Kamu Berhasil Membuat Lowongan Kerja!",
        });
      });
    },
    onError: () => {
      toast({
        title: "Gagal Membuat Lowongan Kerja!",
        description: "Gagal Membuat Lowongan Kerja!",
        variant: "destructive",
      });
    },
  });

  async function onSubmit() {
    await addJobMutation.mutateAsync();
  }

  // Loading state
  if (!isDataLoaded || isPending) {
    return (
      <div className="w-full px-4 md:px-8">
        <IsPendingClient className="w-full h-svh my-10" />;
      </div>
    );
  }

  // Tidak ada profil perusahaan
  if (data?.exists === false) {
    return (
      <div className="flex flex-col items-center justify-center h-[75vh] w-full">
        <h1 className="text-xl md:text-2xl font-bold">
          Profile Perusahaan Anda Belum Lengkap
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Silahkan lengkapi profile perusahaan anda terlebih dahulu
        </p>
        <Link
          href="/dashboard/profile"
          className="mt-4 text-primary_color underline text-[10px] md:text-xs"
        >
          Lengkapi Profile
        </Link>
      </div>
    );
  }

  if (data?.exists) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8 py-8 px-8">
          <div className="space-y-2">
            <span className="font-bold text-lg md:text-xl">
              Posisi Pekerjaan
            </span>
            <Input
              className="text-sm md:text-base"
              {...register("position_job")}
              type="text"
              placeholder="Beritahu Posisi Pekerjaan"
              autoComplete="off"
            />
            {errors.position_job && (
              <p className="text-xs md:text-sm text-red-500">
                {errors.position_job.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="font-bold text-xl md:text-2xl mb-2">
              Informasi Pekerjaan
            </h1>
            <span className="font-bold text-lg md:text-xl">
              Status Pekerjaan
            </span>
            <Select onValueChange={(value) => setValue("status_work", value)}>
              <SelectTrigger className="w-44 text-sm md:text-base">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="text-sm md:text-base">
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

          <div className="space-y-2">
            <span className="font-bold text-lg md:text-xl">Range Gaji</span>
            <Select onValueChange={(value) => setValue("salary_range", value)}>
              <SelectTrigger className="w-60 text-sm md:text-base">
                <SelectValue placeholder="Gaji" />
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

          <div className="space-y-2">
            <span className="font-bold text-lg md:text-xl">Tanggung Jawab</span>
            <Textarea
              className="text-sm md:text-base"
              {...register("responsibilty")}
              placeholder="Beritahu Tanggung Jawab Dari Posisi Pekerjaan"
              rows={4}
            />
            {errors.responsibilty && (
              <p className="text-xs md:text-sm text-red-500">
                {errors.responsibilty.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <span className="font-bold text-lg md:text-xl">
              Kualifikasi / Persyaratan
            </span>
            <Textarea
              className="text-sm md:text-base"
              {...register("qualification")}
              placeholder="Beritahu Kualifikasi / Persyaratan Dari Posisi Pekerjaan"
              rows={4}
            />
            {errors.qualification && (
              <p className="text-xs md:text-sm text-red-500">
                {errors.qualification.message}
              </p>
            )}
          </div>

          <div className="flex justify-end items-center text-sm md:text-base">
            {addJobMutation.isPending ? (
              <Button type="submit" className="bg-secondary_color_1" disabled>
                <Loader className="h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button type="submit" className="bg-secondary_color_1">
                Simpan
              </Button>
            )}
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-center justify-center h-[75vh] w-full gap-5">
      <Loader className="h-6 w-6 md:h-8 md:w-8 animate-spin" />
      <p className="text-lg md:text-xl font-medium">Tunggu Sebentar...</p>
    </div>
  );
}
