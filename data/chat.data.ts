import { db } from "@/lib/db";

export const getChatById = async (id: string) => {
    try {
        return await db.chats.findUnique({
            where: { id },
        });
    } catch {
        return null;
    }
};

export const getChatByToken = async (token: string) => {
    try {
        return await db.chats.findFirst({
            where: { token },
        });
    } catch {
        return null;
    }
};

export const getChatList = async () => {
    try {
        return await db.chats.findMany({
            select:
            {
                id: true,
                enable: true,
                type: true,
                image: true,
                name: true,
                uri: true
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    } catch {
        return null;
    }
};