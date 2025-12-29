import {z} from "zod";

export const UserDataSchema = z.object({
    auth_id: z.uuid(),
    email: z.email(),
    created_at: z.date()
})