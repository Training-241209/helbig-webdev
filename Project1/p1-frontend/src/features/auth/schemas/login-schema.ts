import {z} from "zod";

export const loginFormSchema = z.object({
    username: z
    .string({
        required_error: "Enter your username.",
    }).regex(/^[a-zA-Z0-9_]*$/, "Please only enter alphanumeric characters.")
    .min(1, "Please enter a valid username.")
    .max(50),
    password: z
    .string({
        required_error: "Enter your password.",
    })
    .regex(/^[a-zA-Z0-9_]*$/, "Please only enter alphanumeric characters.")
    .min(8, "Password must be at least 8 characters.")
    .max(50),
});

export type LoginSchema = z.infer<typeof loginFormSchema>;