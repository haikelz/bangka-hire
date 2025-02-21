"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { loginSchema } from "@/lib/schemas/auth-schema";
import { loginAccount } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function LoginFormJobApplicant() {
  const router = useRouter();

  const {
    getValues,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () =>
      await loginAccount({
        email: getValues("email"),
        password: getValues("password"),
      }),
    onSuccess: async (response) => {
      // cek status dari response
      if (response.status_code === 400) {
        return toast({
          title: "Gagal login!",
          description: response.message,
          variant: "destructive",
        });
      }

      await queryClient.invalidateQueries().then(() => {
        setTimeout(() => {
          router.push("/");
        }, 1000);

        toast({
          title: "Sukses login!",
          description: "Kamu akan dialihkan ke halaman dashboard!",
        });
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
        <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="border border-primary_color focus:border-primary_color text-black"
              name="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="border border-primary_color focus:border-primary_color text-black"
              name="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="space-x-2 flex justify-center items-center">
            <div className="w-full border border-primary_color h-[1px]"></div>
            <span className="text-black">atau</span>
            <div className="w-full border border-primary_color h-[1px]"></div>
          </div>

          <Button
            type="submit"
            className="w-full bg-secondary_color_1 hover:bg-primary_color "
          >
            Masuk
          </Button>
          <Button
            type="button"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
            className="border border-primary_color bg-[#F3F9FF] rounded-sm w-full py-5"
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
          {/* nge link ke daftar akun */}
          <div>
            <p className="text-black">
              Belum punya akun?{" "}
              <span className="text-primary_color">
                <Link className="hover:underline" href={"/auth/sign-up"}>
                  Daftar Sekarang
                </Link>
              </span>
            </p>
          </div>
          {/* daftar sebagai employeer */}
          <div>
            <p className="text-black">
              Daftar sebagai{" "}
              <span className="text-primary_color">
                <Link
                  className="hover:underline"
                  href={"/auth/sign-up-job-vacancy-provider"}
                >
                  Employeer ?
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
