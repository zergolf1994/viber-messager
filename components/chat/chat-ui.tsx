import { FC, useContext, useEffect, useState } from "react"


import { useParams } from "next/navigation";

import { useScroll } from "./chat-hooks/use-scroll";
import { ChatScrollButtons } from "./chat-scroll-buttons";
import { useInterval } from "@/hooks/use-interval";
import { ChatMessages } from "./chat-messages";
import { useChatUI } from "@/context/context";
import { ChatInput } from "./chat-input";

interface ChatUIProps { }

export const ChatUI: FC<ChatUIProps> = ({ }) => {
    const params = useParams()

    const {
        setChatMessages,
    } = useChatUI()

    const {
        messagesStartRef,
        messagesEndRef,
        handleScroll,
        scrollToBottom,
        setIsAtBottom,
        isAtTop,
        isAtBottom,
        isOverflowing,
        scrollToTop
    } = useScroll()

    const [loading, setLoading] = useState(true)
    const [length, setLength] = useState(10)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchMessages()

            setChatMessages(data?.message || [])
            //await fetchChat()
            if (isAtTop) {
                console.log("top", isAtTop)
            }
            if (isAtBottom) {
                console.log("bottom", isAtBottom)
            }
            scrollToBottom()
            setIsAtBottom(true)
        }

        if (params.chatId) {
            fetchData().then(() => {
                //handleFocusChatInput()
                setLoading(false)
            })
        } else {
            setLoading(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchMessages()

            setChatMessages(data?.message || [])
            //await fetchChat()
            scrollToBottom()
            setIsAtBottom(true)
        }

        if (params.chatId) {
            fetchData().then(() => {
                //handleFocusChatInput()
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [length])

    const fetchMessages = async () => {
        const message = Array.from({ length }).map((text, index) => {
            return {
                message: index.toString(),
                type: "text"
            }
        })

        return {
            message
        }
    }


    /*useInterval(() => {
        setLength(e => e + 10)
    }, 5000)
*/

    return (

        <div className="relative flex h-full flex-col items-center">
            <div className="absolute left-4 top-2.5 flex justify-center">
                <ChatScrollButtons
                    isAtTop={isAtTop}
                    isAtBottom={isAtBottom}
                    isOverflowing={isOverflowing}
                    scrollToTop={scrollToTop}
                    scrollToBottom={scrollToBottom}
                />
            </div>

            <div className="absolute right-4 top-1 flex h-[40px] items-center space-x-2">
                ChatSecondaryButtons
            </div>

            <div className="bg-secondary flex max-h-[50px] min-h-[50px] w-full items-center justify-center border-b-2 px-20 font-bold">
                <div className="max-w-[300px] truncate sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]">
                    Chat
                </div>
            </div>


            <div
                className="flex size-full flex-col overflow-auto border-b"
                onScroll={handleScroll}
            >
                <div ref={messagesStartRef} />

                <ChatMessages />

                <div ref={messagesEndRef} />
            </div>

            <div className="relative w-[300px] items-end pb-8 pt-5 sm:w-[400px] md:w-[500px] lg:w-[660px] xl:w-[800px]">
                <ChatInput />
            </div>
        </div>
    )
}