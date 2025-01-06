import { z } from "zod";

export const resolveReimbursementSchema = z.object({
    rembId: z.number(),
    status: z.string(),
});

export type ResolveReimbursementSchema = z.infer<typeof resolveReimbursementSchema>;