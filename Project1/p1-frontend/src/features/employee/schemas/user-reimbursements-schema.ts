import {z} from "zod";

export const userReimbursementSchema = z.object({
    rembId: z.number(),
    description: z.string(),
    amount: z.number(),
    status: z.string(),
});

export type UserReimbursementSchema = z.infer<typeof userReimbursementSchema>;