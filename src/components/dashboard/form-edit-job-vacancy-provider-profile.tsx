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
import { editJobVacancyProviderProfile } from "@/services/common";
import { UserProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PencilIcon,
} from "lucide-react";
import { DefaultSession } from "next-auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

export function FormEditJobVacancyProviderProfile({
  jobVacancyProvider,
  userGoogle,
  userId,
}: {
  jobVacancyProvider: UserProps;
  userGoogle:
    | ({
        id: string;
        role: string;
        email: string;
        name: string;
        image: string;
      } & DefaultSession)
    | undefined;
  userId: string;
}) {
  const queryClient = useQueryClient();

  const {
    formState: { errors },
    getValues,
    register,
    handleSubmit,
  } = useForm<z.infer<typeof editJobVacancyProviderProfileSchema>>({
    defaultValues: {
      full_name: jobVacancyProvider?.full_name ?? "",
      company_type: jobVacancyProvider?.profile?.company_type ?? "",
      description: jobVacancyProvider?.profile?.description_company ?? "",
      city: jobVacancyProvider?.profile?.city ?? "",
      street: jobVacancyProvider?.profile?.street ?? "",
      social_media: {
        instagram: jobVacancyProvider?.profile?.instagram ?? "",
        facebook: jobVacancyProvider?.profile?.facebook ?? "",
        gmail: jobVacancyProvider?.email ?? "",
      },
    },
    resolver: zodResolver(editJobVacancyProviderProfileSchema),
  });

  const editProfileMutation = useMutation({
    mutationFn: async () =>
      await editJobVacancyProviderProfile({
        user_id: userId,
        full_name: getValues("full_name"),
        company_type: getValues("company_type"),
        description: getValues("description"),
        city: getValues("city"),
        street: getValues("street"),
        social_media: {
          facebook: getValues("social_media.facebook"),
          instagram: getValues("social_media.instagram"),
          gmail: getValues("social_media.gmail"),
        },
        google_oauth: true,
      }),
    onSuccess: async (response) => {
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
      <div className="flex space-x-2 justify-start w-fit items-start">
        <Avatar className="w-24 h-24 md:w-32 md:h-32">
          {/* Gambar */}
          {jobVacancyProvider?.image ? (
            <AvatarImage
              src={jobVacancyProvider.image}
              alt="avatar"
              referrerPolicy="no-referrer"
            />
          ) : (
            <AvatarFallback className="bg-primary_color text-white text-2xl">
              {jobVacancyProvider?.full_name
                ?.split(" ")
                .map((name: string) => name[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          )}
        </Avatar>
        <Button className="bg-secondary_color_1 hover:bg-primary_color w-7 h-7">
          <PencilIcon />
        </Button>
      </div>
      <div className="space-y-2">
        <span className="font-bold text-xl">Nama Perusahaan</span>
        <Input
          {...register("full_name")}
          placeholder="Beritahu nama Perusahaanmu"
        />
        {errors.full_name ? <span></span> : null}
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
        <Select
          defaultValue={jobVacancyProvider?.profile.city ?? "Lokasi"}
          {...register("city")}
        >
          <SelectTrigger className="w-44">
            <SelectValue
              placeholder={jobVacancyProvider?.profile.city ?? "Lokasi"}
            />
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
          {...register("street")}
          placeholder="Beritahu Alamat Lengkap Perusahaanmu"
        />
        {errors.street ? <span></span> : null}
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
              {...register("social_media.gmail")}
              placeholder="Gmail.com"
            />
            {errors.social_media?.gmail ? <span></span> : null}
          </div>
          <div className="flex justify-end items-center">
            <Button type="submit" className="bg-secondary_color_1">
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
