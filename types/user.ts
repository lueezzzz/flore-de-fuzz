import { UserDataSchema } from "@/schemas/user";
import {z} from "zod";

export type UserDataType = z.infer<typeof UserDataSchema>