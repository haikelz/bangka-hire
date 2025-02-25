import * as z from "zod";

export const editProfileSchema = z.object({
  full_name: z
    .string({
      required_error: "Nama lengkap harus diisi",
      invalid_type_error: "Nama lengkap harus berupa text",
    })
    .min(3, {
      message: "Nama lengkap minimal 3 karakter",
    })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Nama lengkap hanya boleh mengandung huruf dan spasi",
    }),
  phone_number: z
    .string({
      required_error: "Nomor telepon harus diisi",
      invalid_type_error: "Nomor telepon harus berupa angka",
    })
    .regex(/^0[1-9][0-9]{8,11}$/, {
      message:
        "Nomor telepon tidak valid, harus dimulai dengan 0 dan terdiri dari 10-13 angka",
    }),
});

export const editProfileTentangSayaSchema = z.object({
  description: z.string().min(5, {
    message: "Deskripsikan dirimu dengan minimal 5 karakter",
  }),
});

export const applyJobSchema = z.object({
  cv: z
    .any() // Bisa menerima file atau null, tapi akan divalidasi di bawah
    .superRefine((file, ctx) => {
      if (!file) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CV harus diisi",
        });
      } else if (!(file instanceof File)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CV harus berupa file PDF",
        });
      } else if (file.type !== "application/pdf") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CV harus berupa file PDF",
        });
      }
    }),
});

export const reviewJobVacancyProviderSchema = z.object({
  comment: z.string().min(1),
});
