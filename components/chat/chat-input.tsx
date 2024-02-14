import { FC, useState } from "react"
import { TextareaAutosize } from "@/components/ui/textarea-autosize"
import { useChatHandler } from "./chat-hooks/use-chat-handler"
import { usePrompt } from "./chat-hooks/use-prompt"
import { ImageIcon, SendHorizonalIcon } from "lucide-react"
import { useChatUI } from "@/context/context"
import { CldUploadButton } from "next-cloudinary";

interface ChatInputProps { }

export const ChatInput: FC<ChatInputProps> = ({ }) => {

    const [isTyping, setIsTyping] = useState<boolean>(false)

    const {
        chatMessages,
        setChatMessages,
    } = useChatUI()

    const {
        chatInputValue,
        handleInputChange,
        setPrompt
    } = usePrompt()

    const {
        chatInputRef,
        handleSendMessage,
        handleStopMessage,
        handleFocusChatInput
    } = useChatHandler()

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            setChatMessages([...chatMessages, { message: chatInputValue, type: "text" }])
            setPrompt("")
            return
        }
    }
    const handlePaste = (event: React.ClipboardEvent) => {
        const items = event.clipboardData.items
        for (const item of items as any) {
            if (item.type.indexOf("image") === 0) {
                const file = item.getAsFile()
                if (!file) return
                //console.log(file)
            }
        }

    }


    const handleUpload = (result: any) => {
        console.log(result)
        /*axios.post('/api/messages', {
            image: result.info.secure_url,
            conversationId: conversationId
        })*/
    }


    return (
        <>
            {isTyping && "isTyping"}
            <div className="border-input relative mt-3 flex min-h-[60px] w-full items-center justify-center rounded-xl border-2">

                <CldUploadButton
                    options={{ maxFiles: 1, maxFileSize: 1024 * 1024 * 5 }}
                    onUpload={handleUpload}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
                >
                    <ImageIcon size={32} className="absolute bottom-[12px] left-3 cursor-pointer p-1 hover:opacity-50" />
                </CldUploadButton>
                <TextareaAutosize
                    textareaRef={chatInputRef}
                    className="ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-md flex w-full resize-none rounded-md border-none bg-transparent px-14 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={`"/" for prompts`}
                    onValueChange={handleInputChange}
                    value={chatInputValue}
                    minRows={1}
                    maxRows={18}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    onCompositionStart={() => setIsTyping(true)}
                    onCompositionEnd={() => setIsTyping(false)}
                />
                <div className="absolute bottom-[14px] right-3 cursor-pointer hover:opacity-50">
                    <SendHorizonalIcon />
                </div>
            </div>
        </>
    )
}