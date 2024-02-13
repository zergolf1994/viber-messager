import * as z from "zod";

export const SignInSchema = z.object({
    email: z
        .string()
        .email("This is not a valid email."),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
})

export const SignUpSchema = z.object({
    name: z
        .string()
        .min(5, { message: "Name must be at least 5 characters." }),
    email: z
        .string()
        .email("This is not a valid email."),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
})