import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  phone_number: z.string().regex(/^8[1-9][0-9]{8,11}$/),
  password: z.string(),
});
