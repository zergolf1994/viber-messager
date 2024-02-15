"use server"

import { Sleep } from "@/hooks/use-sleep"
import { SearchParams } from "@/types"
import { ChatItem, CreateChat } from "./client"
import { getChatList } from "@/data/chat.data"

export const ChatLists = async ({ searchParams }: SearchParams) => {

    const rows = await getChatList()
    return (
        <>
            {rows?.map((row) =>
                <ChatItem key={row.id} {...row} />
            )}
            <CreateChat />
        </>
    )
}