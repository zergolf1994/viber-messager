"use server";
import * as z from "zod";

import { db } from "@/lib/db";
import { CreateChatSchema, DeleteChatSchema } from "@/schemas/chats.schema";
import { revalidatePath } from "next/cache";
import { getChatById, getChatByToken } from "@/data/chat.data";
import { ChatType } from "@prisma/client";
import fetcher from "@/lib/fetcher";
import { Sleep } from "@/hooks/use-sleep";

export const CreateViberAction = async (
    values: z.infer<typeof CreateChatSchema>,
) => {
    try {
        const validatedFields = CreateChatSchema.safeParse(values);

        if (!validatedFields.success) throw new Error("Invalid fields!")

        const { token, type } = validatedFields.data;
        const existingChat = await getChatByToken(token)

        if (existingChat) throw new Error("Chat already in use!")

        const create = await db.chats.create({
            data: {
                token,
                type: type as ChatType,
            },
        });

        if (!create) throw new Error("Something went wrong.")
        const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/viber/webhook/${create.id}`
        //setwebhook
        const dataSetwebhook = await setViberWebhooks(token, webhookUrl)

        if (dataSetwebhook.status_message != "ok") {
            await db.chats.delete({
                where: {
                    id: create.id,
                },
            });
            throw new Error(dataSetwebhook.status_message)
        }

        await Sleep(2000)
        //dataViber
        const dataViber = await getViberInfo(token)
        if (dataViber.status_message != "ok") {
            await db.chats.delete({
                where: {
                    id: create.id,
                },
            });
            await setViberWebhooks(token, "")
            throw new Error(dataViber.status_message)
        }
        console.log("dataViber", dataViber)
        const updateChat = await db.chats.update({
            data: {
                token,
                name: dataViber?.name,
                image: dataViber?.icon,
                uri: dataViber?.uri,
                webhook: dataViber?.webhook,
            },
            where: {
                id: create.id,
            }
        });


        revalidatePath('/admin/chats')
        return { message: "success" }
    } catch (error: any) {
        //console.log(error)
        return { error: true, message: error?.message }
    }
}

export const DeleteViberAction = async (
    values: z.infer<typeof DeleteChatSchema>,
) => {
    try {
        const validatedFields = DeleteChatSchema.safeParse(values);

        if (!validatedFields.success) throw new Error("Invalid fields!")

        const { chatId } = validatedFields.data;

        const existingChat = await getChatById(chatId)

        if (!existingChat) throw new Error("Chat not found!")


        await setViberWebhooks(existingChat.token as string, "")

        await db.chats.delete({
            where: {
                id: chatId
            },
        });

        revalidatePath('/admin/chats')
        return { message: "success" }
    } catch (error: any) {
        //console.log(error)
        return { error: true, message: error?.message }
    }
}

const setViberWebhooks = async (token: string, webhookUrl: string) => {
    return await fetcher("https://chatapi.viber.com/pa/set_webhook", {
        method: "POST",
        body: JSON.stringify(
            {
                auth_token: token,
                url: webhookUrl,
                event_types: [
                    "delivered",
                    "seen",
                    "failed",
                    "subscribed",
                    "unsubscribed",
                    "conversation_started",
                ],
                send_name: true,
                send_photo: true
            }
        )
    })
}

const getViberInfo = async (token: string) => {
    return await fetcher("https://chatapi.viber.com/pa/get_account_info", {
        method: "POST",
        body: JSON.stringify(
            {
                auth_token: token,
            }
        )
    })
}