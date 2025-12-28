import { LoginSchema, RegisterSchema } from "@/schemas/form";
import {z} from "zod";

export type RegisterType = z.infer<typeof RegisterSchema>
export type LoginType = z.infer<typeof LoginSchema>