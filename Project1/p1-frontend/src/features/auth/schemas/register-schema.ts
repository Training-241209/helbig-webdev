import { z } from "zod"

export const registerFormSchema = z.object({
    username: z
    .string({
        required_error: "Please enter a valid username.",
    })
    .regex(/^[a-zA-Z0-9_]*$/, "Please only enter alphanumeric characters.")
    .min(1, "Please enter a valid username.")
    .max(50),
    firstName: z
    .string({
        required_error: "Please enter a valid first name."
    })
    .regex(/^[a-zA-Z]+$/, "Please only enter alphabetical characters."),
    lastName: z
    .string({
        required_error: "Please enter a valid last name."
    })
    .regex(/^[a-zA-Z]+$/, "Please only enter alphabetical characters.")
    .min(1)
    .max(50),
    password: z
    .string({
        required_error: "Please enter a valid password.",
    })
    .regex(/^[a-zA-Z0-9_]*$/, "Please only enter alphanumeric characters.")
    .min(8, "Password must be at least 8 characters.")
    .max(50),
    confirmPassword: z
    .string({
        message: "Please confirm your password."
    })
    .regex(/^[a-zA-Z0-9_]*$/, "Please only enter alphanumeric characters.")
    .min(1, "Please confirm your password.")
    .max(50),
});

export type RegisterSchema = z.infer<typeof registerFormSchema>;