import { db } from "@/lib/db";

export const getCountUser = async () => {
    try {
        return await db.users.count();
    } catch {
        return null;
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.users.findUnique({ where: { email } });

        return user;
    } catch {
        return null;
    }
};