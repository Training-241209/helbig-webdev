import { z } from "zod";

export const adminResolvedReimbursementSchema = z.object({
    rembId: z.number(),
    description: z.string(),
    amount: z.number(),
    status: z.string(),
    userId: z.number(),
});

export type AdminResolvedReimbursementsSchema = z.infer<typeof adminResolvedReimbursementSchema>