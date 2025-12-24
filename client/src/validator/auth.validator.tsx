import { z } from "zod";

export const registerValidator = z
  .object({
    name: z.string("Invalid name").min(2).max(20),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginValidator = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type TRegisterValidator = z.infer<typeof registerValidator>;
export type TLoginValidator = z.infer<typeof loginValidator>;
