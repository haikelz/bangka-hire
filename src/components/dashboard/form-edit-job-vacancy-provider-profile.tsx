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
import { citiesList } from "@/lib/static";
import { editJobVacancyProviderProfile } from "@/services/common";
import { UserProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FacebookIcon,
  InstagramIcon,
  Loader,
  MailIcon,
  PencilIcon,
} from "lucide-react";
import { DefaultSession } from "next-auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type Props = {
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
};

export function FormEditJobVacancyProviderProfile({
  jobVacancyProvider,
  userGoogle,
  userId,
}: Props) {
  const queryClient = useQueryClient();

  const {
    formState: { errors },
    getValues,
    register,
    handleSubmit,
    setValue,
  } = useForm<z.infer<typeof editJobVacancyProviderProfileSchema>>({
    defaultValues: {
      full_name: jobVacancyProvider?.full_name ?? "",
      company_type: jobVacancyProvider?.profile?.company_type ?? "",
      description: jobVacancyProvider?.profile?.description_company ?? "",
      street: jobVacancyProvider?.profile?.street ?? "",
      social_media: {
        instagram: jobVacancyProvider?.profile?.instagram ?? "",
        facebook: jobVacancyProvider?.profile?.facebook ?? "",
        gmail: jobVacancyProvider?.profile?.gmail ?? "",
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
        google_oauth: userGoogle ? true : false,
      }),
    onSuccess: async (response) => {
      if (response.status_code === 400) {
        return toast({
          title: "Gagal mengupdate profile!",
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
        <Label htmlFor="full_name" className="font-bold text-xl">
          Nama Perusahaan
        </Label>
        <Input
          {...register("full_name")}
          placeholder="Beritahu nama Perusahaanmu"
          required
        />
        {errors.full_name ? (
          <p className="text-xs md:text-sm text-red-500">
            {errors.full_name.message}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="company_type" className="font-bold text-xl">
          Industri
        </Label>
        <Input
          {...register("company_type")}
          placeholder="Beritahu Bidang Industri Perusahaanmu"
          required
        />
        {errors.company_type ? (
          <p className="text-xs md:text-sm text-red-500">
            {errors.company_type.message}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="font-bold text-xl">
          Tentang Perusahaan
        </Label>
        <Textarea
          className="h-24"
          {...register("description")}
          placeholder="Beritahu tentang perusahaan"
          required
        />
        {errors.description ? (
          <p className="text-xs md:text-sm text-red-500">
            {errors.description.message}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label className="font-bold text-xl">Lokasi</Label>
        <Select
          onValueChange={(value) => setValue("city", value)}
          defaultValue={jobVacancyProvider?.profile?.city}
          {...register("city")}
        >
          <SelectTrigger className="w-44">
            <SelectValue
              placeholder="Pilih Lokasi..."
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
        <Label htmlFor="street" className="font-bold text-xl">
          Alamat
        </Label>
        <Input
          {...register("street")}
          placeholder="Beritahu Alamat Lengkap Perusahaanmu"
          required
        />
        {errors.street ? (
          <p className="text-xs md:text-sm text-red-500">
            {errors.street.message}
          </p>
        ) : null}
      </div>
      <div className="space-y-4">
        <Label htmlFor="social_media" className="font-bold text-xl">
          Sosial Media
        </Label>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-center items-center space-x-2">
              <Label htmlFor="social_media.instagram">
                <InstagramIcon />
              </Label>
              <Input
                {...register("social_media.instagram")}
                placeholder="Instagram.com"
                required
              />
            </div>
            {errors.social_media?.instagram ? (
              <p className="text-xs ml-8 md:text-sm text-red-500">
                {errors.social_media.instagram.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <div className="flex justify-center items-center space-x-2">
              <Label htmlFor="social_media.facebook">
                <FacebookIcon />
              </Label>
              <Input
                {...register("social_media.facebook")}
                placeholder="Facebook.com"
                required
              />
            </div>
            {errors.social_media?.facebook ? (
              <p className="text-xs ml-8 md:text-sm text-red-500">
                {errors.social_media.facebook.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <div className="flex justify-center items-center space-x-2">
              <Label htmlFor="social_media.gmail">
                <MailIcon />
              </Label>
              <Input
                {...register("social_media.gmail")}
                placeholder="Gmail.com"
                required
              />
            </div>
            {errors.social_media?.gmail ? (
              <p className="text-xs md:text-sm ml-8 text-red-500">
                {errors.social_media.gmail.message}
              </p>
            ) : null}
          </div>
          <div className="flex justify-end items-center">
            {editProfileMutation.isPending ? (
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
      </div>
    </form>
  );
}
