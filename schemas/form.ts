import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z.email("Invalid Email"),
    password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginFormSchema = z.object({
  email: z.email("Invalid Email"),
  password: z.string().min(8, "Password too short"),
});

export const CheckoutFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  phoneNumber: z.string().min(11)


  
});