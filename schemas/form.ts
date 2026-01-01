import { z } from "zod";
import { listRegions } from "@jobuntux/psgc";

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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Email is required"),
  phoneNumber: z.string().min(11),

  address: z.string().min(5),
  zipCode: z.string().max(4),
  city: z.string().min(2),
  region: z.enum(
    listRegions().map((region) => region.regionName) as [string, ...string[]]
  ),
});
