"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { signUpSchema } from "@/lib/schemas/auth-schema";
import { createAccount } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { Eye, EyeOff, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SignUpFormJobApplicant() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmationPassword, setIsShowConfirmationPassword] =
    useState<boolean>(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const signUpMutation = useMutation({
    mutationFn: async () =>
      await createAccount({
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
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
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

    setCookie("sign-up-role", "job_applicant", {
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
            Selamat Datang! Pencari Kerja
          </h3>
          <p className="text-black">
            Daftar sekarang dan mulai jelajahi pekerjaan tanpa batas.
          </p>
        </div>
        <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input
              {...register("full_name")}
              type="text"
              placeholder="Nama Lengkap"
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
            <div className="relative flex justify-center items-center">
              <Input
                {...register("password")}
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                className="border border-[#3C74FF] focus:border-[#3C74FF] text-black"
                name="password"
              />
              {isShowPassword ? (
                <EyeOff
                  size={21}
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              ) : (
                <Eye
                  size={21}
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <div className="flex justify-center items-center relative">
              <Input
                {...register("confirm_password")}
                type={isShowConfirmationPassword ? "text" : "password"}
                placeholder="Konfirmasi Password"
                className="border border-[#3C74FF] focus:border-[#3C74FF] text-black"
                name="confirm_password"
              />
              {isShowConfirmationPassword ? (
                <EyeOff
                  size={21}
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() =>
                    setIsShowConfirmationPassword(!isShowConfirmationPassword)
                  }
                />
              ) : (
                <Eye
                  size={21}
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() =>
                    setIsShowConfirmationPassword(!isShowConfirmationPassword)
                  }
                />
              )}
            </div>
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-secondary_color_1 hover:bg-primary_color"
            disabled={signUpMutation.isPending}
          >
            {signUpMutation.isPending ? (
              <Loader className="w-7 h-7 animate-spin" />
            ) : (
              "Daftar"
            )}
          </Button>
          <div className="space-x-2 flex justify-center items-center">
            <div className="w-full border border-primary_color h-[1px]"></div>
            <span className="text-black">atau</span>
            <div className="w-full border border-primary_color h-[1px]"></div>
          </div>
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
