import {z} from "zod";

export const RegisterSchema = z.object({
  email: z.email("Invalid Email"),
  userName: z.string().min(3),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  confirmPassword: z.string()
});

export const LoginSchema = z.object({
    email: z.email("Invalid Email"),
    password: z.string().min(8, "Password too short")
})