import {z} from "zod";

export const editReimbursementSchema = z.object({
    rembId: z.number(),
    description: z
    .string({
        required_error: "Enter a reimbursement description",
    })
    .min(1)
    .max(100),
    amount : z
    .number({
        required_error: "Enter a reimbursement amount",
    })
    .min(1),
})

export type EditReimbursementSchema = z.infer<typeof editReimbursementSchema>