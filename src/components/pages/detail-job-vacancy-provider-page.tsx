"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { FacebookIcon, InstagramIcon, MailIcon, StarIcon } from "lucide-react";
import { useState } from "react";
import CardResultJob from "../card-result-job";

export function DetailJobVacancyProviderPage() {
  const [companyTab, setCompanyTab] = useState<"deskripsi" | "pekerjaan">(
    "deskripsi"
  );

  const {
    getValues,
    formState: { errors },
    setValue,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () => {},
    onSuccess: async () => {
      await queryClient.invalidateQueries().then(() => {
        setTimeout(() => {
          toast({
            title: "Sukses login!",
            description: "Kamu akan dialihkan ke halaman dashboard!",
          });
        }, 1000);
      });
    },
    onError: (data) => {
      return toast({
        title: "Gagal login!",
        description: data.message,
      });
    },
  });

  async function onSubmit() {
    await loginMutation.mutateAsync();
  }

  return (
    <>
      <div className="rounded-sm bg-secondary_color_2 px-6 py-4">
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
          <Button onClick={() => setCompanyTab("deskripsi")}>Deskripsi</Button>
          <Button onClick={() => setCompanyTab("pekerjaan")}>Pekerjaan</Button>
          {companyTab === "deskripsi" ? (
            <div>
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
                      <StarIcon
                        className="stroke-secondary_color_1"
                        key={item}
                      />
                    ))}
                </div>
                <div className="flex justify-center items-center w-full space-x-8 mt-4">
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
              <div className="flex w-full flex-col mt-7 justify-start items-start">
                <div className="border-primary_color border px-2 bg-white py-2 w-full rounded-sm">
                  <StarIcon
                    width={16}
                    height={16}
                    className="fill-secondary_color_1 stroke-secondary_color_1"
                  />
                </div>
              </div>
            </div>
          ) : companyTab === "pekerjaan" ? (
            <div className="w-full">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
                {[...Array(8)].map((_, i) => (
                  <CardResultJob key={i} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
