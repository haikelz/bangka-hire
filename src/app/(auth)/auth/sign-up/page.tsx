"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import db from "@/lib/db";
import { useForm } from "react-hook-form";

export default function SignUp() {
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
    const existingJobApplicant = await db.job_applicant.findUnique({
      where: {
        email: getValues("email"),
      },
    });

    if (existingJobApplicant) {
      return toast({
        title: "Gagal mendaftarkan akun!",
        description: "Email yang kamu masukkan sudah terdaftar!",
      });
    }

    await db.job_applicant.create({
      data: {
        full_name: getValues("full_name"),
        phone_number: getValues("phone_number"),
        email: getValues("email"),
        password: getValues("password"),
      },
    });
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
          <Button className="font-bold">Sign Up</Button>
        </form>
      </div>
    </div>
  );
}
