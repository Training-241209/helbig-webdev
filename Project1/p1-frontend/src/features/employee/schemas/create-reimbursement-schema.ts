import {z} from "zod";

export const createReimbursementSchema = z.object({
    description: z
    .string({
        required_error: "Enter a reimbursement description",
    })
    .regex(/^[a-zA-Z0-9_]*$/)
    .min(1)
    .max(100),
    amount : z
    .number({
        required_error: "Enter a reimbursement amount",
    })
    .min(1),
})

export type CreateReimbursementSchema = z.infer<typeof createReimbursementSchema>