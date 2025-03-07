"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { loginSchema } from "@/lib/schemas/auth-schema";
import { loginAdmin } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function LoginFormAdmin() {
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
      await loginAdmin(getValues("email"), getValues("password")),
    onSuccess: async (response) => {
      // cek status dari response
      if (response.status_code === 400) {
        return toast({
          title: "Gagal login sebagai admin!",
          description: response.message,
          variant: "destructive",
        });
      }

      await queryClient.invalidateQueries().then(() => {
        setTimeout(() => {
          router.push("/dashboard/admin");
        }, 1000);

        toast({
          title: "Sukses login!",
          description: "Kamu akan dialihkan ke halaman dashboard admin!",
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
          <h3 className="text-black text-xl font-bold">
            Selamat Datang! Admin
          </h3>
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
          <Button
            type="submit"
            className="w-full bg-secondary_color_1 hover:bg-primary_color"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <Loader className="w-7 h-7 animate-spin" />
            ) : (
              "Masuk"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
