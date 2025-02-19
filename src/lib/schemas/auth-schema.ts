import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid"}),
  password: z.string({
    required_error: "Password harus diisi",
    invalid_type_error: "Password harus berupa text"
  }).min(6, {
    message: "Password minimal 6 karakter"
  })
});

export const signUpSchema = z.object({
      email: z.string({
        required_error: "Email harus diisi",
        invalid_type_error: "Email harus berupa text"
      }).email({
        message: "Format email tidak valid"
      }),

      phone_number: z.string({
        required_error: "Nomor telepon harus diisi",
        invalid_type_error: "Nomor telepon harus berupa angka"
      }).regex(/^0[1-9][0-9]{8,11}$/, {
        message: "Nomor telepon tidak valid, harus dimulai dengan 0 dan terdiri dari 10-13 angka"
      }),

      password: z.string({
        required_error: "Password harus diisi",
        invalid_type_error: "Password harus berupa text"
      }).min(6, {
        message: "Password minimal 6 karakter"
      }),

      confirm_password: z.string({
        required_error: "Konfirmasi password harus diisi",
        invalid_type_error: "Konfirmasi password harus berupa text"
      }),

      full_name: z.string({
        required_error: "Nama lengkap harus diisi",
        invalid_type_error: "Nama lengkap harus berupa text"
      }).min(3, {
        message: "Nama lengkap minimal 3 karakter"
      }).regex(/^[a-zA-Z\s]*$/, {
        message: "Nama lengkap hanya boleh mengandung huruf dan spasi"
      })
});
