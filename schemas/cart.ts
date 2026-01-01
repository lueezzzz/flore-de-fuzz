import {z} from "zod";

export const CartItemSchema = z.object({
    productId: z.string(),
    productName: z.string(),
    quantity: z.number(),
    price: z.number().positive(),
    imageUrl: z.url().optional()
})

export const CartSchema = z.object({
    items: z.array(CartItemSchema),
    updatedAt: z.date().optional()
})