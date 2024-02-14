import { useChatUI } from "@/context/context"
import { FC } from "react"
import { Message } from "./message/message"

interface ChatMessagesProps { }

export const ChatMessages: FC<ChatMessagesProps> = ({ }) => {
    const { chatMessages } = useChatUI()
    return chatMessages.map((row) => {
        return (<Message key={row.message} {...row}/>)
    })
}