import { z } from "zod";

export const adminReimbursementSchema = z.object({
    rembId: z.number(),
    description: z.string(),
    amount: z.number(),
    status: z.string(),
    userId: z.number(),
});

export type AdminReimbursementsSchema = z.infer<typeof adminReimbursementSchema>