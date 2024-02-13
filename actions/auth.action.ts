"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/data/user.data";
import { SignInSchema, SignUpSchema } from "@/schemas/auth.schema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


export const SignInAction = async (
    values: z.infer<typeof SignInSchema>,
) => {
    try {
        const validatedFields = SignInSchema.safeParse(values);

        if (!validatedFields.success) throw new Error("Invalid fields!")

        const { email, password } = validatedFields.data;

        const existingUser = await getUserByEmail(email);
        if (!existingUser || !existingUser.email || !existingUser.password) throw new Error("Email does not exist!")


        const passwordsMatch = await bcrypt.compare(
            password,
            existingUser.password,
        );
        if (!passwordsMatch) throw new Error("Password is invalid!")

        revalidatePath('/')
        return { message: "success" }
    } catch (error: any) {
        //console.log(error)
        return { error: true, message: error?.message }
    }
}

export const SignUpAction = async (
    values: z.infer<typeof SignUpSchema>,
) => {
    try {
        const validatedFields = SignUpSchema.safeParse(values);

        if (!validatedFields.success) throw new Error("Invalid fields!")

        const { name, email, password } = validatedFields.data;

        const existingUser = await getUserByEmail(email);
        if (existingUser) throw new Error("Email already in use!")

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        revalidatePath('/')
        return { message: "success" }
    } catch (error: any) {
        //console.log(error)
        return { error: true, message: error?.message }
    }
}