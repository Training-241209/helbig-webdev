import { z } from "zod"

export const adminUsersSchema = z.object({
    userId: z.number(),
    username: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    role: z.string(),
});

export type AdminUsersSchema = z.infer<typeof adminUsersSchema>;