"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { createReviewJobVacancyProvider } from "@/services/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";

export function ReviewJobVacancyProviderForm() {
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
    mutationFn: async () =>
      await createReviewJobVacancyProvider({
        company: "",
        body: "",
      }),
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
    <div className="bg-white rounded-sm py-8 px-8">
      <div className="w-full space-y-4">
        <Image src="/assets/logo.png" alt="logo" width={138.72} height={77} />
        <div className="space-y-2">
          <h3 className="text-black text-xl font-bold">Selamat Datang!</h3>
          <p className="text-black">
            Daftar sekarang dan cari kerjaan yang cocok untukmu di wilayah
            Bangka Belitung.
          </p>
        </div>
        <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="border border-[#3C74FF] focus:border-[#3C74FF] text-black"
              name="email"
            />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="border border-[#3C74FF] focus:border-[#3C74FF] text-black"
              name="password"
            />
          </div>
          <div className="space-x-2 flex justify-center items-center">
            <div className="w-full border border-[#3C74FF] h-[1px]"></div>
            <span className="text-black">atau</span>
            <div className="w-full border border-[#3C74FF] h-[1px]"></div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
            className="border border-[#3C74FF] bg-[#F3F9FF] rounded-sm w-full py-5"
            variant="outline"
          >
            <Image
              src="/assets/google.svg"
              alt="google icon"
              width={20}
              height={20}
            />
            <p className="text-black">Lanjut Dengan Google</p>
          </Button>
        </form>
      </div>
    </div>
  );
}
