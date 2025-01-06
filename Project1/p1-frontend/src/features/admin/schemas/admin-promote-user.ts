import { z } from "zod";

export const adminPromoteUserSchema = z.object({
    userId: z.number(),
});

export type AdminPromoteUserSchema = z.infer<typeof adminPromoteUserSchema>