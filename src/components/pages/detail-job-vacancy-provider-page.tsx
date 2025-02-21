"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { UserProps } from "@/types";
import { atom, useAtom } from "jotai";
import { FacebookIcon, InstagramIcon, MailIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CardResultJob from "../card-result-job";

const ratingAtom = atom<number>(0);

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
      review: "",
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
        <div>
          <div className="flex space-y-0.5 flex-col justify-between items-center w-fit">
            <div className="flex space-x-2 justify-between items-center w-fit">
              <div className="flex space-x-2 justify-center items-center w-fit">
                <StarIcon
                  width={16}
                  height={16}
                  className="fill-secondary_color_1 stroke-secondary_color_1"
                />
                <p>Total Penilaian</p>
              </div>
              <p>Ulasan</p>
            </div>
            <p>Bergabung sejak</p>
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
                <p className="font-bold">Tentang Perusahaan</p>
                <div className="mt-6">
                  <h3 className="text-black text-xl font-bold">Hubungi Kami</h3>
                  <div className="space-y-3">
                    <p className="font-bold text-black mt-3">Alamat</p>
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
                  <div className="flex justify-center items-center w-full space-x-8 mt-4 mb-7">
                    <Input
                      placeholder="Tulis Ulasan"
                      className="border border-primary_color focus:border-primary_color text-black"
                    />
                    <Button
                      type="submit"
                      className="border border-primary_color bg-[#F3F9FF] rounded-sm"
                      size="lg"
                      variant="outline"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
                <div className="flex w-full flex-col justify-start items-start">
                  <div className="border-primary_color border px-4 bg-white py-4 w-full rounded-sm">
                    <div>
                      <div className="flex w-full justify-between items-start">
                        <div className="flex justify-center items-center w-fit space-x-2">
                          <Image
                            src="/assets/logo.png"
                            alt="comment"
                            width={50}
                            height={50}
                          />
                          <p>Syahrul</p>
                        </div>
                        <p>12.05</p>
                      </div>
                      <div className="flex justify-center items-center w-fit space-x-2">
                        <span>4</span>
                        <StarIcon
                          width={16}
                          height={16}
                          className="fill-secondary_color_1 stroke-secondary_color_1"
                        />
                      </div>
                      <p>
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
