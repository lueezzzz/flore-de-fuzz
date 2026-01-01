import { CartItemSchema, CartSchema } from "@/schemas/cart";
import { z } from "zod";

export type CartItemType = z.infer<typeof CartItemSchema>
export type CartType = z.infer<typeof CartSchema>