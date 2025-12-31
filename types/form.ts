import { CheckoutFormSchema, LoginFormSchema, RegisterFormSchema } from "@/schemas/form";
import {z} from "zod";

export type RegisterFormType = z.infer<typeof RegisterFormSchema>
export type LoginFormType = z.infer<typeof LoginFormSchema>
export type CheckoutFormType = z.infer<typeof CheckoutFormSchema>