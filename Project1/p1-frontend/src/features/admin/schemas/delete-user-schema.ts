import { z } from "zod";

export const deleteUserSchema = z.object({
    userId: z.number(),
});

export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
