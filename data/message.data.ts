import { db } from "@/lib/db";

export const updateMessageSeen = (message_token: number) => db.messages.updateMany({
    data: { seenAt: new Date() },
    where: { message_token }
});

export const saveMessage = (values: any = {}) => db.messages.create({
    data: { ...values },
});