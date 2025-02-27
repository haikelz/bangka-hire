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
import { toast } from "@/hooks/use-toast";
import { editJobVacancyProviderProfileSchema } from "@/lib/schemas/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PencilIcon,
} from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const citiesList = [
  {
    id: 1,
    value: "Pangkalpinang",
  },
  {
    id: 2,
    value: "Bangka Tengah",
  },
  {
    id: 3,
    value: "Bangka Selatan",
  },
  {
    id: 4,
    value: "Bangka Barat",
  },
  {
    id: 5,
    value: "Bangka Induk",
  },
  {
    id: 6,
    value: "Belitung",
  },
  {
    id: 7,
    value: "Belitung Timur",
  },
];

export function FormEditJobVacancyProviderProfile() {
  const queryClient = useQueryClient();

  const {
    formState: { errors },
    getValues,
    register,
    handleSubmit,
  } = useForm<z.infer<typeof editJobVacancyProviderProfileSchema>>({
    resolver: zodResolver(editJobVacancyProviderProfileSchema),
  });

  const editProfileMutation = useMutation({
    mutationFn: async () => {},
    onSuccess: async (response) => {
      // cek status dari response
      /*if (response.status_code === 400) {
        return toast({
          title: "Gagal mendaftarkan akun!",
          description: response.message,
          variant: "destructive",
        });
      }*/

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
        title: "Gagal mengupdate profile!",
        description: data.message,
      });
    },
  });

  async function onSubmit() {
    await editProfileMutation.mutateAsync();
  }

  return (
    <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-2 justify-center items-start">
        <Button className="bg-secondary_color_1">
          <PencilIcon />
        </Button>
        <Image src="/" alt="company pic" width={500} height={500} />
      </div>
      <div className="space-y-2">
        <span className="font-bold text-xl">Nama Perusahaan</span>
        <Input {...register("name")} placeholder="Beritahu nama Perusahaanmu" />
        {errors.name ? <span></span> : null}
      </div>
      <div className="space-y-2">
        <span className="font-bold text-xl">Industri</span>
        <Input
          {...register("company_type")}
          placeholder="Beritahu Bidang Industri Perusahaanmu"
        />
        {errors.company_type ? <span></span> : null}
      </div>
      <div className="space-y-2">
        <span className="font-bold text-xl">Tentang Perusahaan</span>
        <Input
          {...register("description")}
          placeholder="Beritahu tentang perusahaan"
        />
        {errors.description ? <span></span> : null}
      </div>
      <div className="space-y-2">
        <span className="font-bold text-xl">Lokasi</span>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Lokasi" />
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
      <div className="space-y-2">
        <span className="font-bold text-xl">Alamat</span>
        <Input
          {...register("address")}
          placeholder="Beritahu Alamat Lengkap Perusahaanmu"
        />
        {errors.address ? <span></span> : null}
      </div>
      <div className="space-y-4">
        <span className="font-bold text-xl">Sosial Media</span>
        <div className="space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <InstagramIcon />
            <Input
              {...register("social_media.instagram")}
              placeholder="Instagram.com"
            />
            {errors.social_media?.instagram ? <span></span> : null}
          </div>
          <div className="flex justify-center items-center space-x-2">
            <FacebookIcon />
            <Input
              {...register("social_media.facebook")}
              placeholder="Facebook.com"
            />
            {errors.social_media?.facebook ? <span></span> : null}
          </div>
          <div className="flex justify-center items-center space-x-2">
            <MailIcon />
            <Input
              {...register("social_media.email")}
              placeholder="Gmail.com"
            />
            {errors.social_media?.email ? <span></span> : null}
          </div>
          <div className="flex justify-end items-center">
            <Button className="bg-secondary_color_1">Simpan</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
