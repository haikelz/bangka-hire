"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { signUpSchemaJobVacancy } from "@/lib/schemas/auth-schema";
import { createAccountForJobVacancy } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SignUpFormJobVacancyProvider() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const signUpMutation = useMutation({
    mutationFn: async () =>
      await createAccountForJobVacancy({
        phone_number: getValues("phone_number"),
        full_name: getValues("full_name"),
        email: getValues("email"),
        password: getValues("password"),
        confirm_password: getValues("confirm_password"),
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
          router.push("/");
        }, 1000);

        toast({
          title: "Sukses mendaftarkan akun!",
          description: "Kamu akan dialihkan ke halaman dashboard!",
        });
      });
    },
    onError: (data) => {
      return toast({
        title: "Gagal mendaftarkan akun!",
        description: data.message,
      });
    },
  });

  const {
    formState: { errors },
    getValues,
    register,
    handleSubmit,
  } = useForm<z.infer<typeof signUpSchemaJobVacancy>>({
    resolver: zodResolver(signUpSchemaJobVacancy),
    defaultValues: {
      phone_number: "",
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit() {
    await signUpMutation.mutateAsync();
  }

  function handleSignUpWithGoogle() {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    setCookie("sign-up-role", "job_vacancy_provider", {
      expires: expirationDate,
    });
    signIn("google", { redirect: false, callbackUrl: "/" });
  }

  return (
    <div className="bg-white rounded-sm py-8 px-8">
      <div className="w-full space-y-4">
        <Image src="/assets/logo.png" alt="logo" width={138.72} height={77} />
        <div className="space-y-2">
          <h3 className="text-black text-xl font-bold">
            Selamat Datang! Pemberi Kerja
          </h3>
          <p className="text-black">
            Daftar sekarang dan mulai cari karyawan yang berkualitas di seluruh
            Bangka Belitung.
          </p>
        </div>
        <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input
              {...register("full_name")}
              type="text"
              placeholder="Nama Perusahaan/Nama Toko"
              className="border border-[#3C74FF] focus:border-[#3C74FF] text-black"
              name="full_name"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm">{errors.full_name.message}</p>
            )}
            <Input
              {...register("phone_number")}
              type="text"
              placeholder="No Handphone"
              className="border border-[#3C74FF] focus:border-[#3C74FF] text-black"
              name="phone_number"
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">
                {errors.phone_number.message}
              </p>
            )}
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="border border-[#3C74FF] focus:border-[#3C74FF] text-black"
              name="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="border border-[#3C74FF] focus:border-[#3C74FF] text-black"
              name="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <Input
              {...register("confirm_password")}
              type="password"
              placeholder="Konfirmasi Password"
              className="border border-[#3C74FF] focus:border-[#3C74FF] text-black"
              name="confirm_password"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
          <div className="space-x-2 flex justify-center items-center">
            <div className="w-full border border-[#3C74FF] h-[1px]"></div>
            <span className="text-black">atau</span>
            <div className="w-full border border-[#3C74FF] h-[1px]"></div>
          </div>
          <Button
            type="submit"
            className="w-full bg-secondary_color_1 hover:bg-primary_color"
          >
            Daftar
          </Button>
          <Button
            type="button"
            onClick={() => handleSignUpWithGoogle()}
            className="border border-[#3C74FF] bg-[#F3F9FF] rounded-sm w-full py-5"
            variant="outline"
          >
            <Image
              src="/assets/google.svg"
              alt="google icon"
              width={20}
              height={20}
            />
            <p className="text-black">Daftar Dengan Google</p>
          </Button>
          <div>
            <p className="text-black">
              Sudah punya akun?{" "}
              <span className="text-[#3C74FF] cursor-pointer">
                <Link className="hover:underline" href="/auth/login">
                  Masuk
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
