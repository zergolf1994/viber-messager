import { FC } from "react"


interface MessageProps {
    message: string
    type: string
}

export const Message: FC<MessageProps> = ({ message, type }) => {
    if (type == "text")
        return (
            <>
                <p dangerouslySetInnerHTML={{ __html: message }}></p>
            </>
        )
}