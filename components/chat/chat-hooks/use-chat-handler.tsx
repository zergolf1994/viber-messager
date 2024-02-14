import { useChatUI } from "@/context/context"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export const useChatHandler = () => {
    const router = useRouter()

    const { abortController, setAbortController } = useChatUI()

    const chatInputRef = useRef<HTMLTextAreaElement>(null)

    const handleSendMessage = async (
        messageContent: string,
    ) => {
        const startingInput = messageContent


    }

    const handleFocusChatInput = () => {
        chatInputRef.current?.focus()
    }

    const handleStopMessage = () => {
        if (abortController) {
            abortController.abort()
        }
    }

    return {
        chatInputRef,
        handleSendMessage,
        handleStopMessage,
        handleFocusChatInput
    }
}