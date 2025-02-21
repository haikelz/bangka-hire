"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/use-current-user";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ratingAtom } from "@/store";
import { UserProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  Calendar,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CardResultJob from "../card-result-job";

export function DetailJobVacancyProviderPage() {
  const user = useUser() as unknown as UserProps;

  const [companyTab, setCompanyTab] = useState<"deskripsi" | "pekerjaan">(
    "deskripsi"
  );
  const [rating, setRating] = useAtom(ratingAtom);

  const {
    getValues,
    formState: { errors },
    setValue,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () => {},
    /*await createReviewJobVacancyProvider({
        body: getValues("review"),
        company: {},
        user,
      }),*/
    onSuccess: async () => {
      await queryClient.invalidateQueries().then(() => {
        toast({
          title: "Sukses login!",
          description: "Kamu akan dialihkan ke halaman dashboard!",
        });
      });
    },
    onError: (data) => {
      return toast({
        title: "Gagal memberikan review!",
        description: data.message,
      });
    },
  });

  async function onSubmit() {
    await loginMutation.mutateAsync();
  }

  return (
    <>
      <div className="rounded-sm bg-secondary_color_2 px-7 py-6">
        <div className="space-y-5">
          <div className="flex sm:flex-row flex-col sm:space-x-10 space-y-2 sm:space-y-0 justify-between items-start w-fit">
            <Image
              src="/assets/logo.png"
              alt="company logo"
              width={77}
              height={77}
            />
            <div className="space-y-1">
              <h3 className="font-bold text-xl">HiRex</h3>
              <div className="flex space-x-4 justify-center items-center w-fit">
                <div className="flex justify-center items-center w-fit space-x-2">
                  <span>4.8</span>
                  <StarIcon
                    width={16}
                    height={16}
                    className="fill-secondary_color_1 stroke-secondary_color_1"
                  />
                  <p>Total Penilaian</p>
                </div>
                <p className="underline">16 Ulasan</p>
              </div>
              <div className="space-x-1 flex justify-center items-center w-fit">
                <Image
                  src="/assets/location-company.svg"
                  alt="location"
                  width={16}
                  height={16}
                />
                <p>Web dan Teknologi </p>
              </div>
              <div className="space-x-1 flex justify-center items-center w-fit">
                <Image
                  src="/assets/fluent-location.svg"
                  alt="location"
                  width={16}
                  height={16}
                />
                <p>Bangka Induk, Bangka Belitung</p>
              </div>
              <div className="flex justify-center items-center space-x-2 w-fit">
                <Calendar className="" width={16} height={16} />
                <p>Bergabung sejak Desember 2024</p>
              </div>
            </div>
          </div>
          <div>
            <div className="border-b w-full border-b-primary_color py-3">
              <div className="flex justify-center items-center w-fit space-x-10">
                <h3
                  onClick={() => setCompanyTab("deskripsi")}
                  className={cn(
                    "hover:text-secondary_color_1 text-xl font-bold cursor-pointer",
                    companyTab === "deskripsi" ? "text-secondary_color_1" : ""
                  )}
                >
                  Deskripsi
                </h3>
                <h3
                  onClick={() => setCompanyTab("pekerjaan")}
                  className={cn(
                    "hover:text-secondary_color_1 text-xl font-bold cursor-pointer",
                    companyTab === "pekerjaan" ? "text-secondary_color_1" : ""
                  )}
                >
                  Pekerjaan
                </h3>
              </div>
            </div>
            {companyTab === "deskripsi" ? (
              <div className="w-full py-7">
                <div className="space-y-2">
                  <p className="font-bold">Tentang Perusahaan</p>
                  <p className="text-justify">
                    HireX adalah Perusahaan yang bergerak di bidang web dan
                    teknologi. saat ini sedang membutuhkan UI/UX Desainer
                    sebagai pendukung tim dibidang web dan teknologi Lorem ipsum
                    dolor sit amet consectetur. Donec porta sem netus diam
                    fermentum porta amet elit. Adipiscing elementum suspendisse
                    pulvinar enim proin ornare fringilla ullamcorper adipiscing.
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="text-black text-xl font-bold">Hubungi Kami</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <p className="font-bold text-black mt-3">Alamat</p>
                      <p>Jl. Ahmad Yani, No sekian dari 11/9</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-black">Media Sosial</p>
                      <div className="flex justify-center items-center space-x-2 w-fit">
                        <InstagramIcon width={16} height={16} />
                        <FacebookIcon width={16} height={16} />
                        <MailIcon width={16} height={16} />
                      </div>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-x-2 mt-6 flex justify-center items-center w-fit">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => index + 1)
                      .map((item) => (
                        <button
                          type="button"
                          aria-label={`Star ${item}`}
                          key={item}
                          onClick={() => setRating(item)}
                        >
                          <StarIcon
                            className={cn(
                              "stroke-secondary_color_1",
                              item <= rating ? "fill-secondary_color_1" : ""
                            )}
                          />
                        </button>
                      ))}
                  </div>
                  <div className="flex justify-center items-center w-full flex-col md:space-y-0 md:flex-row md:space-x-8 mt-4 mb-7 space-y-3">
                    <Input
                      placeholder="Tulis Ulasan"
                      className="border border-primary_color focus:border-primary_color text-black"
                    />
                    <Button
                      type="submit"
                      className="border border-primary_color bg-[#F3F9FF] rounded-sm md:w-fit w-full"
                      size="lg"
                      variant="outline"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
                <div className="flex w-full flex-col justify-start items-start">
                  <div className="border-primary_color border px-4 bg-white py-4 w-full rounded-sm">
                    <div className="space-y-1">
                      <div className="flex w-full justify-between items-start">
                        <div className="flex justify-center items-center w-fit space-x-2">
                          <Image
                            className="rounded-full"
                            src="/assets/logo.png"
                            alt="comment"
                            width={50}
                            height={50}
                          />
                          <p>Syahrul</p>
                        </div>
                        <p>12.05</p>
                      </div>
                      <div className="flex justify-center items-center w-fit space-x-1">
                        <span>4</span>
                        <StarIcon
                          width={16}
                          height={16}
                          className="fill-secondary_color_1 stroke-secondary_color_1"
                        />
                      </div>
                      <p className="text-justify">
                        ipsum dolor sit amet consectetur. Donec porta sem netus
                        diam fermentum porta amet elit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : companyTab === "pekerjaan" ? (
              <div className="w-full py-7">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
                  {[...Array(8)].map((_, i) => (
                    <CardResultJob key={i} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
