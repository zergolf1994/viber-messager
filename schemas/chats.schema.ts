import * as z from "zod";

export const CreateChatSchema = z.object({
    token: z.string()
        .min(1, { message: "must be at least 1 characters." }),
    type: z.string()
        .min(1, { message: "must be at least 1 characters." }),
})


export const DeleteChatSchema = z.object({
    chatId: z.string()
        .min(1, { message: "must be at least 1 characters." }),
})