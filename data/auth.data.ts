import { db } from "@/lib/db";

export const createAuthId = async (userId: string) => {
    try {
        return await db.auths.create({
            data: {
                userId,
            },
        });
    } catch {
        return null;
    }
};

export const getAuthById = async (id: string) => {
    try {
        return await db.auths.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        enable: true,
                        name: true,
                        email: true,
                        role: true,
                        image: true
                    }
                }
            }
        });
    } catch {
        return null;
    }
};