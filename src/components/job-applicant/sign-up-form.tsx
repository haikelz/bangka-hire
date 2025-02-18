"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { axiosClient } from "@/services/axios";
import { JobApplicantProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

async function createAccount(data: Omit<JobApplicantProps, "cv" | "id">) {
  const response = await axiosClient.post("/auth/sign-up", data);
  return response.data;
}

export function SignUpFormJobApplicant() {
  const router = useRouter();

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
            description: "Kamu akan dialihkan ke halaman Login",
          });
        }, 1000);

        router.push("/auth/login");
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

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      </div>
    </div>
  );
}
