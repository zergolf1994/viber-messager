import { useState } from "react"

export const usePrompt = () => {
    const [value, setValue] = useState<string>("")

    const handleInputChange = (value: string) => {
        setValue(value)
    }

    return {
        chatInputValue: value,
        handleInputChange,
        setPrompt:setValue
    }
}