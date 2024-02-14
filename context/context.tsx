
import { ChatMessage } from "@/types/chat-message"
import { create } from "zustand";

interface ChatUIContext {

    chatMessages: ChatMessage[]
    setChatMessages: (e: ChatMessage[]) => void

    isGenerating: boolean
    setIsGenerating: (e: boolean) => void


    abortController: AbortController | null
    setAbortController: (e: AbortController | null) => void
}

export const useChatUI = create<ChatUIContext>((set) => ({
    chatMessages: [],
    setChatMessages: (e) => set({ chatMessages: e }),

    isGenerating: false,
    setIsGenerating: (e) => set({ isGenerating: e }),

    abortController: null,
    setAbortController: (e) => set({ abortController: e }),
}));
/*
export const ChatUIContext = createContext<ChatUIContext>({

    chatMessages: [],
    setChatMessages: () => {},

    isGenerating: false,
    setIsGenerating: () => { },

})*/