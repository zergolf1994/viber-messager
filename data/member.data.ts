import { db } from "@/lib/db";

export const getMemberById = async (id: string) => {
    try {
        return await db.members.findUnique({
            where: { id },
        });
    } catch {
        return null;
    }
};

export const getMemberByToken = async (user_token: string) => {
    try {
        return await db.members.findFirst({
            where: { user_token },
        });
    } catch {
        return null;
    }
};

export const createMember = async (values: any = {}) => {
    try {
        const existing = await getMemberByToken(values?.user_token)
        if (existing) throw new Error("has member!")
        console.log(values)
        return await db.members.create({
            data: { ...values, lastAt: new Date() },
        });
    } catch (error) {
        console.log("createMember", error)
        return null;
    }
};

export const updateMemberById = (id: string, values: any = {}) => db.members.update({
    data: { ...values },
    where: { id }
});