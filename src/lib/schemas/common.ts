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

export const editJobVacancyProviderProfileSchema = z.object({
  full_name: z.string().min(1, "Company name is required"),
  company_type: z.string().min(1, "Industry field is required"),
  description_company: z
    .string()
    .min(1, "Information about the company is required"),
  city: z.string().min(1, "Location is required"),
  street: z.string().min(1, "Complete address is required"),
  total_employers: z.string().min(1, "Total Employers is required"),
  social_media: z.object({
    linkedin: z.string().url("Invalid Linkedin URL format").optional(),
    instagram: z.string().url("Invalid Instagram URL format").optional(),
    facebook: z.string().url("Invalid Facebook URL format").optional(),
    gmail: z.string().email("Invalid Gmail format").optional(),
  }),
});

export const createJobVacancyProviderProfileSchema = z.object({
  full_name: z.string().min(1, "Company name is required"),
  company_type: z.string().min(1, "Industry field is required"),
  description_company: z
    .string()
    .min(1, "Information about the company is required"),
  city: z.string().min(1, "Location is required"),
  street: z.string().min(1, "Complete address is required"),
  total_employers: z.string().min(1, "Total Employers is required"),
  social_media: z.object({
    linkedin: z.string().url("Invalid Linkedin URL format").optional(),
    instagram: z.string().url("Invalid Instagram URL format").optional(),
    facebook: z.string().url("Invalid Facebook URL format").optional(),
    gmail: z.string().email("Invalid Gmail format").optional(),
  }),
});

export const createJobVacancySchema = z.object({
  position_job: z
    .string({
      required_error: "Posisi pekerjaan pekerjaan harus diisi",
      invalid_type_error: "Posisi pekerjaan harus berupa text",
    })
    .min(3, {
      message: "Posisi pekerjaan wajib diisi",
    }),
  status_work: z.string({
    required_error: "Status pekerjaan wajib harus diisi",
    invalid_type_error: "Status pekerjaan wajib harus berupa text",
  }),
  salary_range: z.string({
    required_error: "Gaji wajib harus diisi",
    invalid_type_error: "Gaji wajib harus berupa angka",
  }),
  qualification: z
    .string({
      required_error: "Kualifikasi harus diisi",
      invalid_type_error: "Kualifikasi harus berupa text",
    })
    .min(3, {
      message: "Kualifikasi / Pesyaratan Pekerjaan wajib diisi",
    }),
  responsibilty: z
    .string({
      required_error: "Tugas dan tanggung jawab harus diisi",
      invalid_type_error: "Tugas dan tanggung jawab harus berupa text",
    })
    .min(3, {
      message: "Tugas dan tanggung jawab wajib diisi",
    }),
});
