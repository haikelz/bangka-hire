"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { createAccount } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export function SignUpFormJobApplicant() {
  const queryClient = useQueryClient();

  const signUpMutation = useMutation({
    mutationFn: async () =>
      await createAccount({
        phone_number: getValues("phone_number"),
        full_name: getValues("full_name"),
        email: getValues("email"),
        password: getValues("password"),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries().then(() => {
        setTimeout(() => {
          toast({
            title: "Sukses mendaftarkan akun!",
            description: "Kamu akan dialihkan ke halaman dashboard!",
          });
        }, 1000);
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
  } = useForm({
    defaultValues: {
      phone_number: "",
      email: "",
      full_name: "",
      password: "",
    },
  });

  async function onSubmit() {
    await signUpMutation.mutateAsync();
  }

  function handleSignUpWithGoogle() {
    Cookies.set("sign-up-role", "job_applicant", { expires: 7 });
    signIn("google", { redirect: false, callbackUrl: "/" });
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-md">
          <div>
            <Input
              {...register("full_name", { required: true })}
              placeholder="Nama Lengkap...."
              required
              name="full_name"
            />
            {errors.full_name ? <span>{errors.full_name.message}</span> : null}
          </div>
          <div>
            <Input
              {...register("phone_number", { required: true })}
              placeholder="Nomor Telepon...."
              required
              name="phone_number"
            />
            {errors.phone_number ? (
              <span>{errors.phone_number.message}</span>
            ) : null}
          </div>
          <div>
            <Input
              {...register("email", { required: true })}
              placeholder="Email...."
              required
              name="email"
            />
            {errors.email ? <span>{errors.email.message}</span> : null}
          </div>
          <div>
            <Input
              {...register("password", { required: true })}
              placeholder="Password...."
              required
              name="password"
            />
            {errors.password ? <span>{errors.password.message}</span> : null}
          </div>
          <Button className="font-bold" type="submit">
            Sign Up
          </Button>
          <Button onClick={handleSignUpWithGoogle}>Sign Up with Google</Button>
        </form>
      </div>
    </div>
  );
}
